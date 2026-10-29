import { NextRequest, NextResponse } from 'next/server'
import { MARKETS, DEALS, SOURCES, OWNERS } from '@/components/forecast/content'

/**
 * /forecast form endpoint (Pipeline Forecast lead magnet, build b-009).
 *
 * Same-origin proxy: validates the eleven fields, drops bots caught by the honeypot, and forwards to
 * the Reply Desk intake on n8n (RD-16) in FORECAST_WEBHOOK_URL with the header key FORECAST_WEBHOOK_KEY.
 * The webhook URL and key stay server-side.
 *
 * It never reports success it did not get: an unset URL or key, a timeout, a non-2xx answer or a body
 * without ok:true all return 502, and the form shows the error with the fallback address.
 * Nothing personal is logged, only the reason.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const TIMEOUT_MS = 12_000

const LIMITS = { website: 200, sells: 400, buyers: 400, name: 100, role: 100, email: 254, phone: 30 } as const
type TextField = keyof typeof LIMITS

const EMAIL = /^[^\s@]{1,64}@[^\s@]+\.[^\s@]{2,}$/
const SITE = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i
const PHONE = /^\+?[0-9 ()-]{7,24}$/

function clean(v: unknown): string {
  if (typeof v !== 'string') return ''
  return v.replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim()
}

function pick(v: unknown, allowed: readonly string[]): string[] {
  if (!Array.isArray(v)) return []
  return [...new Set(v.map(clean).filter(x => allowed.includes(x)))]
}

function bad(message: string, fields?: string[]) {
  return NextResponse.json({ ok: false, message, fields }, { status: 400 })
}

const notForwarded = () => NextResponse.json({ ok: false, message: 'Not forwarded.' }, { status: 502 })

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

  // Honeypot: a field no person can see. Anything in it is a bot. Answer as if it worked, forward nothing.
  if (clean(body.company_url)) return NextResponse.json({ ok: true })

  const text: Record<TextField, string> = {
    website: clean(body.website),
    sells: clean(body.sells),
    buyers: clean(body.buyers),
    name: clean(body.name),
    role: clean(body.role),
    email: clean(body.email).toLowerCase(),
    phone: clean(body.phone),
  }
  const markets = pick(body.markets, MARKETS)
  const sources = pick(body.sources, SOURCES)
  const deal = DEALS.includes(clean(body.deal) as (typeof DEALS)[number]) ? clean(body.deal) : ''
  const owner = OWNERS.includes(clean(body.owner) as (typeof OWNERS)[number]) ? clean(body.owner) : ''

  const required: TextField[] = ['website', 'sells', 'buyers', 'name', 'email', 'phone']
  const missing: string[] = required.filter(k => !text[k])
  if (!markets.length) missing.push('markets')
  if (!sources.length) missing.push('sources')
  if (!deal) missing.push('deal')
  if (!owner) missing.push('owner')
  if (missing.length) return bad('Please fill in every field.', missing)

  const tooLong = (Object.keys(text) as TextField[]).filter(k => text[k].length > LIMITS[k])
  if (tooLong.length) return bad('One of the answers is too long.', tooLong)
  if (!EMAIL.test(text.email)) return bad('Please check the email address.', ['email'])
  if (!SITE.test(text.website)) return bad('Please check the website address.', ['website'])
  if (!PHONE.test(text.phone)) return bad('Please check the phone number.', ['phone'])

  const target = process.env.FORECAST_WEBHOOK_URL
  const key = process.env.FORECAST_WEBHOOK_KEY
  if (!target || !key) {
    console.error('[api/forecast] FORECAST_WEBHOOK_URL or FORECAST_WEBHOOK_KEY is not set; request not forwarded')
    return notForwarded()
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
      headers: { 'Content-Type': 'application/json', 'X-Forecast-Key': key },
      body: JSON.stringify({
        ...text,
        markets,
        sources,
        deal,
        owner,
        utm,
        page: '/forecast',
        // Local test runs only: never set in Vercel. Marks the submission TEST end to end.
        test: process.env.FORECAST_FORCE_TEST === '1',
        ts: new Date().toISOString(),
      }),
      signal: controller.signal,
      cache: 'no-store',
    })
    if (!res.ok) {
      console.error(`[api/forecast] intake answered ${res.status}`)
      return notForwarded()
    }
    // Only an explicit {"ok":true}, sent by the intake after the row is saved, counts as received.
    const reply = (await res.json().catch(() => null)) as { ok?: unknown } | null
    if (!reply || reply.ok !== true) {
      console.error('[api/forecast] intake did not confirm the request was saved')
      return notForwarded()
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    const reason = err instanceof Error && err.name === 'AbortError' ? 'timed out' : 'failed'
    console.error(`[api/forecast] intake ${reason}`)
    return notForwarded()
  } finally {
    clearTimeout(timer)
  }
}
