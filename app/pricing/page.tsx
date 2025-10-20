export default function Pricing() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-[#0A2D4A] mb-6">
        JobNest Urdaneta Pricing
      </h1>
      <p className="text-center text-slate-600 mb-12">
        Start your journey with us. Enjoy your <strong>first month absolutely free!</strong>
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="rounded-2xl shadow-lg border border-slate-200 p-8 bg-white">
          <h2 className="text-2xl font-bold text-[#0A2D4A] mb-3">🎁 Free Trial</h2>
          <p className="text-slate-600 mb-6">
            Perfect for new employers. Experience JobNest Urdaneta with no commitment.
          </p>
          <ul className="list-disc list-inside text-slate-700 space-y-2">
            <li>✅ 1 month free posting period</li>
            <li>✅ Unlimited applicants during trial</li>
            <li>✅ Local exposure to job seekers in Urdaneta City</li>
          </ul>
          <div className="text-center mt-6">
            <span className="text-2xl font-bold text-[#D9A441]">₱0</span>
            <p className="text-sm text-slate-500">for 1 month</p>
          </div>
        </div>

        {/* Paid Plan */}
        <div className="rounded-2xl shadow-lg border border-slate-200 p-8 bg-white">
          <h2 className="text-2xl font-bold text-[#0A2D4A] mb-3">💼 Standard Plan</h2>
          <p className="text-slate-600 mb-6">
            Continue posting jobs after your trial with simple, transparent pricing.
          </p>
          <ul className="list-disc list-inside text-slate-700 space-y-2">
            <li>📅 ₱50.00 per job posting per month</li>
            <li>🖱️ ₱0.10 per click (only valid applicant views)</li>
            <li>📊 Job analytics and performance reports</li>
            <li>🌆 Urdaneta City–based exposure</li>
          </ul>
          <div className="text-center mt-6">
            <span className="text-2xl font-bold text-[#D9423A]">₱50.00</span>
            <p className="text-sm text-slate-500">per job/month + ₱0.10 per click</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-10">
        <p className="text-slate-600">
          💡 Prices are introductory and may change as we expand. Existing users will be notified in advance.
        </p>
      </div>
    </div>
  );
}
