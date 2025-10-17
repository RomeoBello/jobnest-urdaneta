'use client'
import { useEffect, useState } from 'react'
import { auth, db } from '@/lib/firebase'
import { isAdmin } from '@/lib/admin'
import { collection, getDocs, orderBy, query, updateDoc, doc, where } from 'firebase/firestore'

export default function AdminReview(){
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<any[]>([])
  const [uid, setUid] = useState<string | null>(null)

  useEffect(()=>{
    const unsub = auth.onAuthStateChanged(u => setUid(u?.uid ?? null))
    return () => unsub()
  }, [])

  useEffect(()=>{ if (uid && isAdmin(uid)) load() }, [uid])

  async function load(){
    setLoading(true)
    const qRef = query(collection(db,'jobs'), where('status','in',['pending',null as any]), orderBy('createdAt','desc'))
    const snap = await getDocs(qRef)
    const list: any[] = []
    snap.forEach(d => list.push({ id: d.id, ...(d.data() as any) }))
    setItems(list)
    setLoading(false)
  }

  async function setStatus(id: string, status: 'approved'|'rejected'){
    await updateDoc(doc(db,'jobs',id), { status })
    await load()
  }

  if (!uid) return <div className="max-w-4xl mx-auto px-4 py-12">Sign in to continue.</div>
  if (!isAdmin(uid)) return <div className="max-w-4xl mx-auto px-4 py-12">You are not an admin. Ask owner to add your UID to NEXT_PUBLIC_ADMIN_UIDS in .env.local</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-extrabold text-brandNavy">Pending Job Posts</h1>
      {loading ? <p className="mt-6">Loading…</p> :
      <div className="grid gap-4 mt-6">
        {items.map(j => (
          <div key={j.id} className="p-4 rounded-xl border bg-white">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold">{j.title}</div>
                <div className="text-sm text-slate-600">{j.company}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>setStatus(j.id,'approved')} className="px-3 py-1.5 rounded-lg text-sm bg-green-600 text-white">Approve</button>
                <button onClick={()=>setStatus(j.id,'rejected')} className="px-3 py-1.5 rounded-lg text-sm border border-red-600 text-red-700">Reject</button>
              </div>
            </div>
            {j.salary && <div className="mt-2 text-sm">Pay: {j.salary}</div>}
            <div className="mt-2 text-sm line-clamp-3">{j.description}</div>
          </div>
        ))}
        {items.length===0 && <p>No pending jobs.</p>}
      </div>}
    </div>
  )
}
