export default function PricingPlans() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-[#0A2D4A] mb-6">
        JobNest Urdaneta Pricing
      </h1>
      <p className="text-center text-slate-600 mb-12">
        Start strong — <strong>your first month is FREE!</strong> Then only ₱50 per job/month
        plus ₱0.10 per valid click.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl shadow-lg border border-slate-200 p-8 bg-white">
          <h2 className="text-2xl font-bold text-[#0A2D4A] mb-3">🎁 Free Trial</h2>
          <p className="text-slate-600 mb-6">
            Perfect for new employers in Urdaneta City. Try JobNest with no upfront cost.
          </p>
          <ul className="list-disc list-inside text-slate-700 space-y-2">
            <li>✅ 1 month free posting for new employer accounts</li>
            <li>✅ Unlimited applicants during trial</li>
            <li>✅ Local visibility to nearby job seekers</li>
          </ul>
          <div className="text-center mt-6">
            <span className="text-2xl font-bold text-[#D9A441]">₱0</span>
            <p className="text-sm text-slate-500">for your first month</p>
          </div>
        </div>

        <div className="rounded-2xl shadow-lg border border-slate-200 p-8 bg-white">
          <h2 className="text-2xl font-bold text-[#0A2D4A] mb-3">💼 Intro Standard</h2>
          <p className="text-slate-600 mb-6">
            Continue posting after your trial with affordable local pricing.
          </p>
          <ul className="list-disc list-inside text-slate-700 space-y-2">
            <li>📅 ₱50.00 per job posting per month</li>
            <li>🖱️ ₱0.10 per valid click (applicant views)</li>
            <li>📊 Basic analytics & performance tracking</li>
          </ul>
          <div className="text-center mt-6">
            <span className="text-2xl font-bold text-[#D9423A]">₱50.00</span>
            <p className="text-sm text-slate-500">per job/month + ₱0.10 per click</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-10">
        <p className="text-slate-600">
          💡 Introductory rates to help local employers get started. We’ll notify you ahead of any changes.
        </p>
      </div>
    </section>
  );
}
