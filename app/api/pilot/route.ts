import { NextRequest, NextResponse } from 'next/server'

/**
 * Performance Pilot registration endpoint.
 *
 * Same-origin proxy so the homepage popup never has to call n8n directly
 * (no CORS, webhook URL stays server-side). Forwards the registration to
 * the Rheo CRM ingest workflow `rheo-pilot-register`, which appends the
 * lead to the Google Sheets CRM as a Hot "Pilot Registered" row.
 *
 * The 3,000 deposit is intentionally NOT mentioned anywhere public — it is
 * introduced on the confirmation call only.
 */

const N8N_WEBHOOK =
  'https://n8n.srv1391414.hstgr.cloud/webhook/rheo-pilot-register'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const name = (data?.name ?? '').toString().trim()
    const business = (data?.business ?? '').toString().trim()
    const whatsapp = (data?.whatsapp ?? '').toString().trim()

    if (!name || !whatsapp) {
      return NextResponse.json(
        { success: false, message: 'Name and WhatsApp number are required.' },
        { status: 400 }
      )
    }

    await fetch(N8N_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        business,
        whatsapp,
        source: 'homepage_popup',
        ts: new Date().toISOString(),
      }),
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
