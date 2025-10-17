'use client'
import Link from 'next/link'
import Logo from '@/components/Logo'

export default function Landing(){
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold text-brandNavy">JobNest Urdaneta City</h1>
      <p className="mt-3 text-slate-600 max-w-prose">Find local talent faster.</p>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-brandNavy">For Employers</div>
          <h2 className="mt-1 text-xl font-bold">Hire in Urdaneta City</h2>
          <p className="mt-2 text-sm text-slate-600">Post jobs, manage applicants, and reach local talent quickly.</p>
          <div className="mt-4 flex gap-3">
            <Link href="/post" className="px-4 py-2 rounded-lg text-sm font-semibold bg-brandNavy text-white">Post a Job</Link>
            <Link href="/employers" className="px-4 py-2 rounded-lg text-sm font-semibold border">Employers guide</Link>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-brandNavy">For Job Seekers</div>
          <h2 className="mt-1 text-xl font-bold">Find work nearby</h2>
          <p className="mt-2 text-sm text-slate-600">Browse fresh listings and apply directly to employers.</p>
          <div className="mt-4 flex gap-3">
            <Link href="/jobs" className="px-4 py-2 rounded-lg text-sm font-semibold border">Browse Jobs</Link>
            <Link href="/seekers" className="px-4 py-2 rounded-lg text-sm font-semibold bg-brandNavy text-white">How to apply</Link>
          </div>
        </div>
      </div>

      <a href="/pricing" className="mt-6 inline-block text-sm font-semibold text-brandNavy underline hover:opacity-80">
        See plans →
      </a>
    </section>
  )
}
