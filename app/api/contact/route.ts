import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return new NextResponse('Missing fields', { status: 400 })
    }

    const key = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_TO_EMAIL || 'support@example.com'

    if (!key) {
      return NextResponse.json({ ok: true, skipped: true })
    }

    const resend = new Resend(key)
    await resend.emails.send({
      from: 'JobNest <notifications@your-domain.example>',
      to,
      replyTo: email,
      subject: `New contact from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    })

    return NextResponse.json({ ok: true })
  } catch (e:any) {
    return new NextResponse(e?.message || 'Error', { status: 500 })
  }
}
