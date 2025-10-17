'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { db, storage, auth } from '@/lib/firebase'
import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

type Job = {
  title: string
  company: string
  location?: string
  employmentType?: string
  payType?: string
  payMin?: number | null
  payMax?: number | null
  applicationEmail?: string
  createdBy?: string | null
}

export default function ApplyPage(){
  const { jobId } = useParams() as { jobId: string }
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [sent, setSent] = useState<string | null>(null)

  useEffect(()=>{
    (async()=>{
      if(!jobId) return
      const snap = await getDoc(doc(db,'jobs', jobId))
      if (snap.exists()) {
        setJob(snap.data() as Job)
      }
      setLoading(false)
    })()
  }, [jobId])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    setSent(null)
    const form = new FormData(e.currentTarget)
    const name = String(form.get('name') || '')
    const email = String(form.get('email') || '')
    const message = String(form.get('message') || '')

    // Optional resume upload
    let resumeUrl: string | undefined
    const file = form.get('resume') as File | null
    if (file && file.size > 0) {
      const key = `resumes/applications/${Date.now()}-${file.name}`
      const r = ref(storage, key)
      await uploadBytes(r, file)
      resumeUrl = await getDownloadURL(r)
    }

    const seekerId = auth.currentUser?.uid || null

    await addDoc(collection(db,'applications'), {
      jobId,
      jobTitle: job?.title || '',
      employerId: job?.createdBy || null,
      seekerId,
      applicantName: name,
      applicantEmail: email,
      message,
      resumeUrl: resumeUrl || '',
      createdAt: serverTimestamp(),
      status: 'submitted'
    })

    setSent('Application submitted! The employer will reach out if you’re shortlisted.')
    ;(e.currentTarget as HTMLFormElement).reset()
  }

  if (loading) return <div className="max-w-3xl mx-auto px-4 py-12">Loading…</div>
  if (!job) return <div className="max-w-3xl mx-auto px-4 py-12">Job not found.</div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <button onClick={()=>router.back()} className="text-sm underline">← Back</button>
      <div className="mt-3 p-5 rounded-2xl border bg-white shadow-sm">
        <h1 className="text-xl md:text-2xl font-bold">{job.title}</h1>
        <p className="text-slate-600">{job.company} • {job.location || 'Urdaneta City'}</p>
        <div className="mt-2 text-sm">
          {(job.payMin!=null || job.payMax!=null) ?
            <div>Pay: {job.payMin?`₱${job.payMin.toLocaleString()}`:''}{job.payMax?`–₱${job.payMax.toLocaleString()}`:''} {job.payType?`/${job.payType.replace('ly','')}`:''}</div>
            : null}
          {job.employmentType && <div>Type: {job.employmentType}</div>}
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <div className="grid md:grid-cols-2 gap-3">
          <input name="name" required placeholder="Your full name *" className="px-3 py-2 rounded-lg border" />
          <input name="email" required type="email" placeholder="Your email *" className="px-3 py-2 rounded-lg border" />
        </div>
        <textarea name="message" placeholder="Short message to the employer (optional)"
          className="px-3 py-2 rounded-lg border min-h-[100px]" />
        <div>
          <label className="text-sm">Attach resume (PDF/DOC) — optional</label>
          <input name="resume" type="file" accept=".pdf,.doc,.docx" className="mt-1 block" />
        </div>

        <button className="px-5 py-3 rounded-xl text-sm font-semibold bg-brandNavy text-white">Submit Application</button>
        {sent && <p className="text-green-700 text-sm">{sent}</p>}
      </form>
    </div>
  )
}
