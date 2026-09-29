import { NextRequest, NextResponse } from 'next/server'

/**
 * /outbound booking form endpoint.
 *
 * Same-origin proxy: validates the five fields, drops bots caught by the
 * honeypot, and forwards to the n8n webhook in OUTBOUND_WEBHOOK_URL
 * (CRM sheet row + alert). The webhook URL stays server-side.
 *
 * It never reports success it did not get: an unset URL, a timeout or a
 * non-2xx answer from n8n all return 502, and the form then shows the error
 * with the plain Calendly link. Nothing personal is logged, only the reason.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const TIMEOUT_MS = 10_000

const LIMITS = {
  name: 100,
  email: 254,
  website: 200,
  sells: 500,
  capacity: 60,
} as const

type Field = keyof typeof LIMITS

/* Pragmatic shape check, not RFC 5322: one @, a dot in the domain, no spaces. */
const EMAIL = /^[^\s@]{1,64}@[^\s@]+\.[^\s@]{2,}$/

function clean(v: unknown): string {
  if (typeof v !== 'string') return ''
  // Strip control characters and collapse whitespace
  return v.replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim()
}

function bad(message: string, fields?: Field[]) {
  return NextResponse.json({ ok: false, message, fields }, { status: 400 })
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    const raw = await req.text()
    if (raw.length > 8_000) return bad('Too long.')
    body = JSON.parse(raw)
    if (!body || typeof body !== 'object' || Array.isArray(body)) return bad('Bad request.')
  } catch {
    return bad('Bad request.')
  }

  // Honeypot: a field no person can see. Anything in it is a bot. Answer as
  // if it worked so the bot learns nothing, and forward nothing.
  if (clean(body.company_url)) {
    return NextResponse.json({ ok: true })
  }

  const data = {
    name: clean(body.name),
    email: clean(body.email).toLowerCase(),
    website: clean(body.website),
    sells: clean(body.sells),
    capacity: clean(body.capacity),
  }

  const missing = (Object.keys(data) as Field[]).filter(k => !data[k])
  if (missing.length) return bad('Please fill in every field.', missing)

  const tooLong = (Object.keys(data) as Field[]).filter(k => data[k].length > LIMITS[k])
  if (tooLong.length) return bad('One of the answers is too long.', tooLong)

  if (!EMAIL.test(data.email)) return bad('Please check the email address.', ['email'])

  // A website: a bare domain or a full URL. Must contain a dot and no spaces.
  if (!/^(https?:\/\/)?[^\s/]+\.[^\s]{2,}$/i.test(data.website)) {
    return bad('Please check the website address.', ['website'])
  }

  const target = process.env.OUTBOUND_WEBHOOK_URL
  if (!target) {
    console.error('[api/outbound] OUTBOUND_WEBHOOK_URL is not set; enquiry not forwarded')
    return NextResponse.json({ ok: false, message: 'Not forwarded.' }, { status: 502 })
  }

  const utm = typeof body.utm === 'object' && body.utm && !Array.isArray(body.utm)
    ? Object.fromEntries(
        Object.entries(body.utm as Record<string, unknown>)
          .filter(([k]) => /^utm_(source|medium|campaign|content|term)$/.test(k))
          .map(([k, v]) => [k, clean(v).slice(0, 120)])
      )
    : {}

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(target, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        source: 'outbound_page',
        page: '/outbound',
        ...utm,
        ts: new Date().toISOString(),
      }),
      signal: controller.signal,
      cache: 'no-store',
    })
    if (!res.ok) {
      console.error(`[api/outbound] webhook answered ${res.status}`)
      return NextResponse.json({ ok: false, message: 'Not forwarded.' }, { status: 502 })
    }
    // n8n answers 200 with an empty body when a step fails before its Respond node,
    // so only an explicit {"ok":true} (sent after the sheet row is written) counts.
    const reply = await res.json().catch(() => null) as { ok?: unknown } | null
    if (!reply || reply.ok !== true) {
      console.error('[api/outbound] webhook did not confirm the enquiry was saved')
      return NextResponse.json({ ok: false, message: 'Not forwarded.' }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    const reason = err instanceof Error && err.name === 'AbortError' ? 'timed out' : 'failed'
    console.error(`[api/outbound] webhook ${reason}`)
    return NextResponse.json({ ok: false, message: 'Not forwarded.' }, { status: 502 })
  } finally {
    clearTimeout(timer)
  }
}
