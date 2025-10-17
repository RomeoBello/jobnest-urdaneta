'use client'
import { useState } from 'react'

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    setLoading(true); setOk(null); setErr(null)
    const f = new FormData(e.currentTarget)
    const payload = {
      name: String(f.get('name')||''),
      email: String(f.get('email')||''),
      message: String(f.get('message')||''),
    }
    try {
      const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error(await res.text())
      setOk('Thanks! Your message has been sent.')
      ;(e.currentTarget as HTMLFormElement).reset()
    } catch (e:any) {
      setErr('Could not send via server. You can email us directly at support@example.com.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-sm leading-6">
      <h1 className="text-2xl md:text-3xl font-extrabold text-brandNavy">Contact Us</h1>
      <p className="mt-3">We’re happy to help. For support or partnership inquiries, send us a message below.</p>

      <form onSubmit={onSubmit} className="mt-6 grid gap-3 max-w-xl">
        <input name="name" required placeholder="Your name" className="px-3 py-2 rounded-lg border" />
        <input name="email" type="email" required placeholder="Your email" className="px-3 py-2 rounded-lg border" />
        <textarea name="message" required placeholder="How can we help?" className="px-3 py-2 rounded-lg border min-h-[120px]" />
        <button disabled={loading} className="px-4 py-2 rounded-lg bg-brandNavy text-white disabled:opacity-60">{loading ? 'Sending…' : 'Send message'}</button>
      </form>

      {ok && <p className="mt-3 text-green-700">{ok}</p>}
      {err && <p className="mt-3 text-red-700">{err}</p>}

      <div className="mt-8 rounded-xl border bg-white p-4">
        <div className="font-semibold text-brandNavy">Prefer email?</div>
        <p className="mt-1">Email us at <a className="underline" href="mailto:support@example.com">support@example.com</a></p>
      </div>
    </div>
  )
}
