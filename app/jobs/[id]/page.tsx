'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

export default function JobDetail(){
  const params = useParams() as { id: string }
  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    (async ()=>{
      const ref = doc(db, 'jobs', params.id)
      const snap = await getDoc(ref)
      setJob(snap.exists() ? snap.data() : null)
      setLoading(false)
    })()
  }, [params.id])

  if (loading) return <div className="max-w-3xl mx-auto px-4 py-12">Loading…</div>
  if (!job) return <div className="max-w-3xl mx-auto px-4 py-12">Job not found.</div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-extrabold text-brandNavy">{job.title}</h1>
      <p className="mt-1 text-slate-600">{job.company} • {job.location || 'Urdaneta City'}</p>
      {job.salary && <p className="mt-2">Pay: {job.salary}</p>}
      <div className="prose mt-6 whitespace-pre-wrap">{job.description}</div>
      <a href={`mailto:${job.contactEmail}`} className="mt-6 inline-block px-4 py-2 rounded-lg bg-brandNavy text-white">Apply by Email</a>
    </div>
  )
}
