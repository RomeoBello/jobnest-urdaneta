export default function Pricing() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="rounded-xl border bg-white p-4 text-sm text-slate-700">
        <span className="inline-block px-2 py-0.5 rounded-full mr-2 text-xs border border-green-600 text-green-700">
          Government
        </span>
        Government offices get the <b>Free plan</b> after simple verification (e.g., @gov.ph or official ID).
      </div>

      <h1 className="mt-6 text-2xl md:text-3xl font-extrabold text-brandNavy">Plans</h1>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <div className="p-6 rounded-2xl border shadow-sm bg-white">
          <div className="text-sm font-semibold text-brandNavy">Government Offices</div>
          <div className="mt-2 text-3xl font-extrabold">FREE</div>
          <ul className="mt-4 text-sm text-slate-600 space-y-2">
            <li>Unlimited job posts</li>
            <li>“Verified Government” badge</li>
            <li>Placement in Government Jobs section</li>
          </ul>
          <a href="/post" className="mt-5 inline-block px-4 py-2 rounded-lg font-semibold bg-brandNavy text-white">Start posting</a>
        </div>

        <div className="p-6 rounded-2xl border-2 shadow-md bg-white border-brandGold">
          <div className="text-sm font-semibold text-brandNavy">Standard (Private / GOCC)</div>
          <div className="mt-2 text-3xl font-extrabold">₱500<span className="text-base font-semibold">/mo</span></div>
          <ul className="mt-4 text-sm text-slate-600 space-y-2">
            <li>Unlimited posts</li>
            <li>Company page & branding</li>
            <li>Basic analytics</li>
          </ul>
          <a href="/post" className="mt-5 inline-block px-4 py-2 rounded-lg font-semibold bg-brandGold text-brandOutline">Subscribe</a>
        </div>

        <div className="p-6 rounded-2xl border shadow-sm bg-white">
          <div className="text-sm font-semibold text-brandNavy">Featured Add‑On</div>
          <div className="mt-2 text-3xl font-extrabold">₱100<span className="text-base font-semibold">/day</span></div>
          <ul className="mt-4 text-sm text-slate-600 space-y-2">
            <li>Top of search placement</li>
            <li>Homepage highlight</li>
            <li>Best for urgent roles</li>
          </ul>
          <a href="/post" className="mt-5 inline-block px-4 py-2 rounded-lg font-semibold border border-brandNavy text-brandNavy">Feature a job</a>
        </div>
      </div>
    </div>
  )
}
