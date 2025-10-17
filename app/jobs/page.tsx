'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { db } from '@/lib/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

type Job = {
  id: string
  title: string
  company: string
  location?: string
  entityType?: 'government' | 'gocc' | 'private'
  employmentType?: 'full-time' | 'part-time' | 'contract' | 'temporary' | 'internship'
  payType?: 'hourly' | 'daily' | 'monthly' | 'yearly'
  payMin?: number | null
  payMax?: number | null
  applicationEmail?: string
  status?: string
  logoUrl?: string
}

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  // filters
  const [qtext, setQtext] = useState('')
  const [cat, setCat] = useState<'All' | 'government' | 'gocc' | 'private'>('All')
  const [etype, setEtype] = useState<'Any' | Job['employmentType']>('Any')
  const [payType, setPayType] = useState<'Any' | Job['payType']>('Any')
  const [minPay, setMinPay] = useState<number | ''>('')

  useEffect(() => {
    (async () => {
      const qRef = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'))
      const snap = await getDocs(qRef)
      const list: Job[] = []
      snap.forEach((d) => list.push({ id: d.id, ...(d.data() as any) }))
      setJobs(list.filter((j) => j.status !== 'rejected' && j.status !== 'pending'))
      setLoading(false)
    })()
  }, [])

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const hay = `${j.title} ${j.company} ${j.location || ''}`.toLowerCase()
      const okText = qtext ? hay.includes(qtext.toLowerCase()) : true
      const okCat = cat === 'All' ? true : j.entityType === cat
      const okEtype = etype === 'Any' ? true : j.employmentType === etype
      const okPayType = payType === 'Any' ? true : j.payType === payType
      const okMinPay = minPay === '' ? true : ((j.payMin ?? 0) >= (minPay as number))
      return okText && okCat && okEtype && okPayType && okMinPay
    })
  }, [jobs, qtext, cat, etype, minPay, payType])

  const fmtPay = (n?: number | null) =>
    typeof n === 'number' ? `₱${n.toLocaleString()}` : ''

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-extrabold text-brandNavy">Jobs in Urdaneta City</h1>

      {/* Filters */}
      <div className="mt-4 grid md:grid-cols-5 gap-3">
        <input
          value={qtext}
          onChange={(e) => setQtext(e.target.value)}
          placeholder="Search title or company"
          className="px-3 py-2 rounded-lg border"
        />
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value as any)}
          className="px-3 py-2 rounded-lg border"
        >
          <option>All</option>
          <option value="government">Government</option>
          <option value="gocc">GOCC</option>
          <option value="private">Private</option>
        </select>
        <select
          value={etype}
          onChange={(e) => setEtype(e.target.value as any)}
          className="px-3 py-2 rounded-lg border"
        >
          <option>Any</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
          <option value="temporary">Temporary</option>
          <option value="internship">Internship</option>
        </select>
        <select
          value={payType}
          onChange={(e) => setPayType(e.target.value as any)}
          className="px-3 py-2 rounded-lg border"
        >
          <option>Any</option>
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        <input
          value={minPay}
          onChange={(e) => setMinPay(e.target.value === '' ? '' : Number(e.target.value))}
          type="number"
          min="0"
          step="1"
          placeholder="Min pay (₱)"
          className="px-3 py-2 rounded-lg border"
        />
      </div>

      {/* List */}
      {loading ? (
        <p className="mt-6 text-sm text-slate-600">Loading…</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {filtered.map((j) => (
            <div key={j.id} className="p-5 rounded-2xl border bg-white shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {j.logoUrl ? (
                    <img src={j.logoUrl} alt="logo" className="w-10 h-10 rounded-md object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-md bg-slate-100" />
                  )}
                  <div>
                    <h4 className="font-semibold">{j.title}</h4>
                    <p className="text-slate-600 text-sm">
                      {j.company} • {j.location || 'Urdaneta City'}
                    </p>
                  </div>
                </div>
                {j.employmentType && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full border">
                    {j.employmentType}
                  </span>
                )}
              </div>

              {(j.payMin != null || j.payMax != null) && (
                <div className="mt-3 text-sm">
                  Pay: {fmtPay(j.payMin)}
                  {j.payMax != null ? `–${fmtPay(j.payMax)}` : ''}{' '}
                  {j.payType ? `/${j.payType.replace('ly', '')}` : ''}
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <Link href={`/jobs/${j.id}`} className="px-3 py-2 text-xs rounded-lg border">
                  View
                </Link>
                <Link
                  href={`/apply/${j.id}`}
                  className="px-3 py-2 text-xs rounded-lg bg-brandNavy text-white"
                >
                  Apply
                </Link>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-3 text-sm text-slate-600">No matching jobs.</p>
          )}
        </div>
      )}
    </div>
  )
}
