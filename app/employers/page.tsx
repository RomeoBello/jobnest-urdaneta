export default function Employers() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-extrabold text-brandNavy">Employers</h1>
      <p className="mt-2 text-slate-600">Everything you need to hire locally in Urdaneta City.</p>

      <ol className="mt-6 space-y-4 text-sm">
        <li><b>1) Create an account</b> – Sign in on the top-right to manage your posts.</li>
        <li><b>2) Post a job</b> – Go to <code>/post</code>, fill details, and submit. New posts start as <i>pending</i> for quick review.</li>
        <li><b>3) Get applicants</b> – Candidates can email you directly. Add a clear description and contact email.</li>
        <li><b>4) Featured</b> – Boost urgent roles with Featured add‑on from the Pricing page.</li>
      </ol>

      <div className="mt-8 rounded-xl border bg-white p-4 text-sm">
        <div className="font-semibold text-brandNavy">Government offices</div>
        <p className="mt-1">Verified government offices can use the Free plan. See details on the <a className="underline" href="/pricing">Pricing</a> page.</p>
      </div>
    </div>
  )
}
