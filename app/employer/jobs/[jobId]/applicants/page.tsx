'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { auth, db } from '@/lib/firebase'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'

type Application = {
  id: string
  applicantName: string
  applicantEmail: string
  message?: string
  resumeUrl?: string
  createdAt?: any
  status?: string
}

export default function ApplicantsPage(){
  const { jobId } = useParams() as { jobId: string }
  const router = useRouter()
  const [apps, setApps] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [uid, setUid] = useState<string | null>(null)

  useEffect(()=>{
    const unsub = auth.onAuthStateChanged(u=>setUid(u?.uid || null))
    return unsub
  }, [])

  useEffect(()=>{
    (async()=>{
      if(!uid || !jobId){ setLoading(false); return }
      const qRef = query(collection(db,'applications'), where('jobId','==', jobId), orderBy('createdAt','desc'))
      const snap = await getDocs(qRef)
      const list:Application[]=[]; snap.forEach(d=>list.push({id:d.id, ...(d.data() as any)}))
      setApps(list)
      setLoading(false)
    })()
  }, [uid, jobId])

  if(!uid) return <div className="max-w-4xl mx-auto px-4 py-12">Please sign in to view applicants.</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button onClick={()=>router.back()} className="text-sm underline">← Back</button>
      <h1 className="mt-2 text-2xl md:text-3xl font-extrabold text-brandNavy">Applicants</h1>
      {loading ? <p className="mt-4 text-sm text-slate-600">Loading…</p> :
      <div className="mt-6 grid gap-4">
        {apps.map(a=>(
          <div key={a.id} className="p-5 rounded-2xl border bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{a.applicantName}</div>
                <a href={`mailto:${a.applicantEmail}`} className="text-sm underline">{a.applicantEmail}</a>
              </div>
              {a.resumeUrl && <a target="_blank" rel="noreferrer" href={a.resumeUrl} className="px-3 py-2 text-xs rounded-lg border">Resume</a>}
            </div>
            {a.message && <p className="mt-3 text-sm whitespace-pre-wrap">{a.message}</p>}
          </div>
        ))}
        {apps.length===0 && <p className="text-sm text-slate-600">No applicants yet.</p>}
      </div>}
    </div>
  )
}
