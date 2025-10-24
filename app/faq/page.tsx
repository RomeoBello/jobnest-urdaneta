'use client';

import React from 'react';

type QA = { q: string; a: React.ReactNode };

const employerFaq: QA[] = [
  { q: 'How do I post a job?', a: <>Go to <strong>Employers → Post a Job</strong>, complete the form, and submit for instant publishing.</> },
  { q: 'What are the pricing/fees?', a: <>Private/GOCC companies follow the current pricing on the <a href="/pricing" className="underline">Pricing</a> page. Government posts are free after verification. Pay‑per‑click applies when configured.</> },
  { q: 'How long does a post stay live?', a: <>Standard posts run for <strong>30 days</strong> by default. You can extend or feature them anytime.</> },
  { q: 'Can I edit or pause a listing?', a: <>Yes. Open <strong>Employers → My Jobs</strong>, then use <em>Edit</em> or <em>Pause</em>.</> },
  { q: 'How do I verify a Government/GOCC account?', a: <>Sign up with an official email (e.g., <code>@gov.ph</code>) or upload an authorization letter/ID for manual review.</> },
  { q: 'Do you have featured placements?', a: <>Yes — choose the <strong>Featured Add‑On</strong> on the Pricing page to place your job at the top and on the homepage highlight section.</> },
  { q: 'How do I get invoices/official receipts?', a: <>After payment, a receipt is emailed automatically. You can also download invoices from <strong>Employers → Billing</strong>.</> },
  { q: 'Who can help me if I have an issue?', a: <>Message us via the <a className="underline" href="/contact">Contact Us</a> page or email the JobNest support team. We’ll respond within 1 business day.</> },
];

const seekerFaq: QA[] = [
  { q: 'How do I apply to a job?', a: <>Open a posting and click <strong>Apply</strong>. You can submit your resume and short message to the employer.</> },
  { q: 'Do I need to pay to apply?', a: <>No. JobNest is free for job seekers.</> },
  { q: 'How do I create or update my profile?', a: <>Go to <strong>Job Seekers → Profile</strong> to add your experience, skills, and resume.</> },
  { q: 'Can I get notifications for new jobs?', a: <>Yes. Use <strong>Saved Searches</strong> or <strong>Job Alerts</strong> to get email notifications.</> },
  { q: 'How do I report a suspicious job?', a: <>Click <em>Report</em> on the job card or contact support. We will review within 24–48 hours.</> },
  { q: 'Where are the jobs located?', a: <>We focus on Urdaneta City and nearby areas, but some remote roles may appear depending on employers.</> },
  { q: 'How do I withdraw an application?', a: <>Open <strong>Job Seekers → Applications</strong>, select the job, and click <em>Withdraw</em>.</> },
  { q: 'How is my data protected?', a: <>We follow our <a href="/privacy" className="underline">Privacy Policy</a>. Only information you choose to share with employers is visible.</> },
];

function QAItem({ qa, idx }: { qa: QA; idx: number }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border-b border-slate-200 py-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between text-left"
        aria-expanded={open}
      >
        <span className="font-medium text-slate-800">{qa.q}</span>
        <span className="ml-4 text-slate-400">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="mt-2 text-slate-600 leading-relaxed">
          {qa.a}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [tab, setTab] = React.useState<'employers' | 'seekers'>('employers');

  const tabs = [
    { key: 'employers' as const, label: 'Employers' },
    { key: 'seekers' as const, label: 'Job Seekers' },
  ];

  const data = tab === 'employers' ? employerFaq : seekerFaq;

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-brandNavy text-center">FAQ</h1>

      <div className="mt-6 flex justify-center gap-2">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={[
              'px-4 py-2 rounded-full border',
              tab === t.key
                ? 'bg-brandNavy text-white border-brandNavy'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            ].join(' ')}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-center text-slate-500">
        Quick answers to common questions. Still need help?{' '}
        <a className="underline" href="/contact">Contact us</a>.
      </p>

      <section className="mt-8 bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
        {data.map((qa, i) => (
          <QAItem key={i} qa={qa} idx={i} />
        ))}
      </section>
    </main>
  );
}
