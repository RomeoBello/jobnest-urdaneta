'use client'
import { useState } from 'react'
import { db, auth, storage } from '@/lib/firebase'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export default function SeekerProfile(){
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault(); setLoading(true); setOk(null)
    const f = new FormData(e.currentTarget)
    const uid = auth.currentUser?.uid
    if (!uid) { alert('Please sign in first.'); setLoading(false); return }

    let resumeUrl: string | undefined
    const resume = f.get('resume') as File | null
    if (resume && resume.size > 0) {
      const key = `resumes/${uid}-${Date.now()}-${resume.name}`
      const r = ref(storage, key)
      await uploadBytes(r, resume)
      resumeUrl = await getDownloadURL(r)
    }

    const profile = {
      name: f.get('name'),
      phone: f.get('phone'),
      email: f.get('email'),
      location: f.get('location') || 'Urdaneta City',
      desiredEmployment: f.get('desiredEmployment'),
      desiredPayType: f.get('desiredPayType'),
      desiredPayMin: Number(f.get('desiredPayMin')||0) || null,
      skills: String(f.get('skills')||'').split(',').map(s=>s.trim()).filter(Boolean),
      summary: f.get('summary') || '',
      manualResume: f.get('manualResume') || '',
      resumeUrl,
      updatedAt: serverTimestamp()
    }

    try{
      await setDoc(doc(db,'seekers', uid), profile as any, { merge: true })
      setOk('Profile saved. You can update anytime.')
      ;(e.currentTarget as HTMLFormElement).reset()
    }catch(err:any){
      alert(err.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-extrabold text-brandNavy">Job Seeker Profile</h1>
      <p className="mt-2 text-slate-600 text-sm">Upload your resume or paste details manually. Employers will contact you via the email you provide.</p>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <div className="grid md:grid-cols-2 gap-3">
          <input name="name" required placeholder="Full name *" className="px-3 py-2 rounded-lg border"/>
          <input name="email" type="email" required placeholder="Email *" className="px-3 py-2 rounded-lg border"/>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <input name="phone" placeholder="Phone" className="px-3 py-2 rounded-lg border"/>
          <input name="location" placeholder="Location (e.g., Urdaneta City)" className="px-3 py-2 rounded-lg border"/>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <select name="desiredEmployment" className="px-3 py-2 rounded-lg border">
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
          <select name="desiredPayType" className="px-3 py-2 rounded-lg border">
            <option value="monthly">Per month</option>
            <option value="hourly">Per hour</option>
            <option value="daily">Per day</option>
            <option value="yearly">Per year</option>
          </select>
          <input name="desiredPayMin" type="number" min="0" step="1" placeholder="Min pay (₱)" className="px-3 py-2 rounded-lg border"/>
        </div>

        <input name="skills" placeholder="Skills (comma-separated)" className="px-3 py-2 rounded-lg border"/>

        <textarea name="summary" placeholder="Short summary (optional)" className="px-3 py-2 rounded-lg border min-h-[80px]"/>
        <div>
          <label className="text-sm">Upload resume (PDF/DOC)</label>
          <input name="resume" type="file" accept=".pdf,.doc,.docx" className="mt-1 block"/>
        </div>
        <textarea name="manualResume" placeholder="Or paste resume text here (optional)" className="px-3 py-2 rounded-lg border min-h-[120px]"/>

        <button disabled={loading} className="px-5 py-3 rounded-xl text-sm font-semibold bg-brandNavy text-white">{loading?'Saving…':'Save Profile'}</button>
        {ok && <p className="text-green-700 text-sm">{ok}</p>}
      </form>
    </div>
  )
}
