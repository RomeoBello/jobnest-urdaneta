export default function Seekers() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-extrabold text-brandNavy">Job Seekers</h1>
      <p className="mt-2 text-slate-600">Tips to find and apply for jobs fast.</p>

      <ol className="mt-6 space-y-4 text-sm">
        <li><b>1) Browse jobs</b> – Visit <a className="underline" href="/jobs">Jobs</a> and use search & filters.</li>
        <li><b>2) Read details</b> – Open a job page to see requirements, salary, and contact email.</li>
        <li><b>3) Apply</b> – Click the Apply button to email the employer with your resume and a short message.</li>
        <li><b>4) Stay ready</b> – Keep your resume updated. Check back for new listings daily.</li>
      </ol>

      <div className="mt-8 rounded-xl border bg-white p-4 text-sm">
        <div className="font-semibold text-brandNavy">Safety</div>
        <p className="mt-1">Apply only to roles that look legitimate. Never pay to apply. Report suspicious posts to our team via the Contact Us page.</p>
      </div>
    </div>
  )
}
