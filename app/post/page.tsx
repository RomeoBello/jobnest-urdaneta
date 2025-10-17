'use client'
import { useState } from 'react'
import { auth, db, storage } from '@/lib/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useRouter } from 'next/navigation'

export default function PostJobPage(){
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    setMsg(null)
    setSaving(true)

    const form = new FormData(e.currentTarget)
    const title = String(form.get('title') || '')
    const company = String(form.get('company') || '')
    const location = String(form.get('location') || 'Urdaneta City')
    const entityType = String(form.get('entityType') || 'private')
    const employmentType = String(form.get('employmentType') || 'full-time')
    const payType = String(form.get('payType') || 'monthly')
    const payMin = form.get('payMin') ? Number(form.get('payMin')) : null
    const payMax = form.get('payMax') ? Number(form.get('payMax')) : null
    const applicationEmail = String(form.get('applicationEmail') || '')
    const description = String(form.get('description') || '')
    const file = form.get('logo') as File | null

    let logoUrl = ''
    if (file && file.size > 0) {
      const key = `logos/${Date.now()}-${file.name}`
      const r = ref(storage, key)
      await uploadBytes(r, file)
      logoUrl = await getDownloadURL(r)
    }

    await addDoc(collection(db,'jobs'), {
      title, company, location, entityType, employmentType, payType,
      payMin, payMax, applicationEmail, description,
      logoUrl,
      status: 'pending',
      createdBy: auth.currentUser?.uid || null,
      createdAt: serverTimestamp(),
    })

    setSaving(false)
    setMsg('Job submitted! Awaiting admin approval.')
    ;(e.currentTarget as HTMLFormElement).reset()
    router.push('/employer/jobs')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-extrabold text-brandNavy">Post a Job</h1>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <div className="grid md:grid-cols-2 gap-3">
          <input name="title" required placeholder="Job title *" className="px-3 py-2 rounded-lg border" />
          <input name="company" required placeholder="Company *" className="px-3 py-2 rounded-lg border" />
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <input name="location" defaultValue="Urdaneta City" placeholder="Location" className="px-3 py-2 rounded-lg border" />
          <select name="entityType" className="px-3 py-2 rounded-lg border">
            <option value="private">Private</option>
            <option value="government">Government</option>
            <option value="gocc">GOCC</option>
          </select>
          <select name="employmentType" className="px-3 py-2 rounded-lg border">
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="temporary">Temporary</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <select name="payType" className="px-3 py-2 rounded-lg border">
            <option value="monthly">Monthly</option>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="yearly">Yearly</option>
          </select>
          <input name="payMin" type="number" min="0" step="1" placeholder="Min pay" className="px-3 py-2 rounded-lg border" />
          <input name="payMax" type="number" min="0" step="1" placeholder="Max pay" className="px-3 py-2 rounded-lg border" />
        </div>

        <input name="applicationEmail" type="email" required placeholder="Application email *" className="px-3 py-2 rounded-lg border" />

        <textarea name="description" placeholder="Job description" className="px-3 py-2 rounded-lg border min-h-[120px]" />

        <div>
          <label className="text-sm">Company logo (PNG/JPG)</label>
          <input name="logo" type="file" accept="image/*" className="mt-1 block" />
        </div>

        <button disabled={saving} className="px-5 py-3 rounded-xl text-sm font-semibold bg-brandNavy text-white">
          {saving ? 'Saving…' : 'Submit job'}
        </button>
        {msg && <p className="text-green-700 text-sm">{msg}</p>}
      </form>
    </div>
  )
}
