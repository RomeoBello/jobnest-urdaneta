'use client';

import { useState } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | JobNest Urdaneta City',
  description:
    'Frequently asked questions for Employers and Job Seekers using JobNest Urdaneta City.',
};

// ---- Editable FAQ DATA -------------------------------------------------------
type QA = { q: string; a: string };

const EMPLOYER_FAQ: QA[] = [
  {
    q: 'How can I post a job on JobNest?',
    a: 'Sign in to your Employer account and click “Post a Job”. Choose your plan (Government, Private/GOCC, or Featured Add-On) and complete the form.',
  },
  {
    q: 'How long does a job post stay live?',
    a: 'Each listing remains active for 30 days from approval. You may renew or feature the listing anytime.',
  },
  {
    q: 'What payment methods do you support?',
    a: 'GCash, Maya, and other local gateways. Payment is authorized when you confirm your plan.',
  },
  {
    q: 'Can I boost visibility?',
    a: 'Yes. The ₱100/day Featured Add-On places your job on top of search results and on the homepage.',
  },
  {
    q: 'What’s the difference between Government, Private/GOCC, and Personal posts?',
    a: 'Government posts are free for verified offices. Private/GOCC is ₱500/month. Personal (e.g., household help) is free to post but charges ₱0.10 per click.',
  },
  {
    q: 'What if I don’t renew?',
    a: 'Expired posts are hidden automatically. Your account and data remain intact.',
  },
  {
    q: 'How do I contact support?',
    a: 'Email support@jobnest.ph or use the Contact page. Our CS team will assist you.',
  },
];

const SEEKER_FAQ: QA[] = [
  {
    q: 'Do I need to pay to apply?',
    a: 'No. JobNest is free for job seekers. Create a profile and apply directly to listings.',
  },
  {
    q: 'How do I know if an employer is verified?',
    a: 'Look for the green check badge beside the employer’s name. It means they passed our verification.',
  },
  {
    q: 'How do I update my profile?',
    a: 'Go to “My Account → Edit Profile” to update your info, resume, and contact details.',
  },
  {
    q: 'I applied but didn’t get a reply. What now?',
    a: 'Employers review at their own pace. If you don’t hear back within two weeks, keep applying to other openings.',
  },
  {
    q: 'Can I report suspicious posts?',
    a: 'Yes. Click “Report Job” on the listing. Our team will review promptly and take action if needed.',
  },
  {
    q: 'Is my data safe?',
    a: 'Yes. We use Firebase Authentication and Firestore rules to keep your data secure and private.',
  },
];

// ---- UI COMPONENTS -----------------------------------------------------------
function ToggleTabs({
  active,
  onChange,
}: {
  active: 'employers' | 'seekers';
  onChange: (v: 'employers' | 'seekers') => void;
}) {
  const base =
    'w-full sm:w-auto px-5 py-2 rounded-xl border text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  const activeCls =
    'bg-brandNavy text-white border-brandNavy focus-visible:ring-brandNavy';
  const inactiveCls =
    'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-400';

  return (
    <div
      role="tablist"
      aria-label="FAQ category"
      className="grid grid-cols-2 gap-3 sm:inline-flex"
    >
      <button
        role="tab"
        aria-selected={active === 'employers'}
        className={`${base} ${active === 'employers' ? activeCls : inactiveCls}`}
        onClick={() => onChange('employers')}
      >
        Employers
      </button>
      <button
        role="tab"
        aria-selected={active === 'seekers'}
        className={`${base} ${active === 'seekers' ? activeCls : inactiveCls}`}
        onClick={() => onChange('seekers')}
      >
        Job Seekers
      </button>
    </div>
  );
}

function QAList({ items }: { items: QA[] }) {
  return (
    <div className="mt-6 space-y-3">
      {items.map((item, i) => (
        <details
          key={i}
          className="group rounded-xl border border-slate-200 bg-white p-4 open:shadow-sm"
        >
          <summary className="cursor-pointer list-none text-base font-semibold text-slate-900 marker:hidden">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-brandNavy" />
              {item.q}
            </span>
          </summary>
          <div className="pt-3 pl-4 text-slate-700">
            <p>{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

// ---- PAGE --------------------------------------------------------------------
export default function FAQPage() {
  const [tab, setTab] = useState<'employers' | 'seekers'>('employers');

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Frequently Asked Questions
        </h1>
        <p className="mt-2 text-slate-600">
          Quick answers for Employers and Job Seekers using JobNest Urdaneta.
        </p>
      </header>

      <ToggleTabs active={tab} onChange={setTab} />

      <section aria-live="polite" className="mt-4">
        {tab === 'employers' ? (
          <>
            <h2 className="sr-only">Employers FAQ</h2>
            <QAList items={EMPLOYER_FAQ} />
          </>
        ) : (
          <>
            <h2 className="sr-only">Job Seekers FAQ</h2>
            <QAList items={SEEKER_FAQ} />
          </>
        )}
      </section>

      {/* Helpful links */}
      <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm text-slate-700">
          Still need help? Contact our support team at{' '}
          <a
            href="mailto:support@jobnest.ph"
            className="font-medium text-brandNavy underline"
          >
            support@jobnest.ph
          </a>{' '}
          or visit the{' '}
          <a href="/contact" className="font-medium text-brandNavy underline">
            Contact Us
          </a>{' '}
          page.
        </p>
      </div>
    </main>
  );
}
