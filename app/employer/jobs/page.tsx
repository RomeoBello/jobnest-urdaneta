'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { auth, db } from '@/lib/firebase'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'

type Job = {
  id: string
  title: string
  company: string
  status?: string
  createdAt?: any
}

export default function EmployerJobs(){
  const [jobs,setJobs]=useState<Job[]>([])
  const [loading,setLoading]=useState(true)
  const [uid, setUid] = useState<string | null>(null)

  useEffect(()=>{
    const unsub = auth.onAuthStateChanged(u=>{
      setUid(u?.uid || null)
    })
    return unsub
  }, [])

  useEffect(()=>{
    (async()=>{
      if(!uid){ setLoading(false); return }
      const qRef=query(collection(db,'jobs'), where('createdBy','==', uid), orderBy('createdAt','desc'))
      const snap=await getDocs(qRef)
      const list:Job[]=[]; snap.forEach(d=>list.push({id:d.id, ...(d.data() as any)}))
      setJobs(list)
      setLoading(false)
    })()
  },[uid])

  if(!uid) return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-extrabold text-brandNavy">Your Job Posts</h1>
      <p className="mt-2 text-sm text-slate-600">Please sign in to see and manage the jobs you posted.</p>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-extrabold text-brandNavy">Your Job Posts</h1>
        <Link href="/post" className="px-3 py-2 rounded-lg bg-brandNavy text-white text-sm">Post a Job</Link>
      </div>
      {loading ? <p className="mt-4 text-sm text-slate-600">Loading…</p> :
      <div className="mt-6 grid gap-4">
        {jobs.map(j=>(
          <div key={j.id} className="p-5 rounded-2xl border bg-white shadow-sm flex items-center justify-between gap-4">
            <div>
              <div className="font-semibold">{j.title}</div>
              <div className="text-slate-600 text-sm">{j.company}</div>
              <div className="text-xs mt-1">Status: <b>{j.status || 'pending'}</b></div>
            </div>
            <div className="flex gap-2">
              <Link href={`/employer/jobs/${j.id}/applicants`} className="px-3 py-2 text-xs rounded-lg border">Applicants</Link>
              <Link href={`/jobs/${j.id}`} className="px-3 py-2 text-xs rounded-lg border">View</Link>
            </div>
          </div>
        ))}
        {jobs.length===0 && <p className="text-sm text-slate-600">No posts yet. Click “Post a Job”.</p>}
      </div>}
    </div>
  )
}
