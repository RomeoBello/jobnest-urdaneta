// app/policy/page.tsx
export const runtime = 'nodejs';            // allow fs on Vercel
export const revalidate = 60 * 60;          // revalidate hourly

import fs from 'fs/promises';
import path from 'path';
import type { Metadata } from 'next';
import { useState, Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Privacy Policy · JobNest Urdaneta City',
  description:
    'Read JobNest Urdaneta City’s Privacy Policy in English and Filipino.',
};

async function readText(rel: string) {
  const full = path.join(process.cwd(), rel);
  return fs.readFile(full, 'utf8');
}

async function getPolicies() {
  // Adjust to match your actual filenames under /legal
  // We include safe fallbacks for the EN1 / FI1 variants you keep.
  const en =
    (await readText('legal/Privacy_Policy_EN1.txt').catch(() => null)) ??
    (await readText('legal/Privacy_Policy_EN.txt').catch(() => null)) ??
    '';

  const tl =
    (await readText('legal/Privacy_Policy_FI1.txt').catch(() => null)) ??
    (await readText('legal/Privacy_Policy_FIL.txt').catch(() => null)) ??
    '';

  return { en, tl };
}

export default async function PolicyPage() {
  const { en, tl } = await getPolicies();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <Tabs initialTab="en" en={en} tl={tl} />
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-2">Government &amp; GOCC Policy</h2>
        <p className="text-slate-700">
          Government offices are free. GOCC follows regular plan.
        </p>
      </section>
    </main>
  );
}

/* ---------- Client tab component ---------- */
'use client';
function Tabs({ en, tl, initialTab = 'en' }: { en: string; tl: string; initialTab?: 'en' | 'tl' }) {
  const [tab, setTab] = useState<'en' | 'tl'>(initialTab);

  return (
    <>
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setTab('en')}
          className={`px-3 py-1 rounded border ${tab === 'en' ? 'bg-slate-900 text-white' : 'bg-white'}`}
        >
          English
        </button>
        <button
          onClick={() => setTab('tl')}
          className={`px-3 py-1 rounded border ${tab === 'tl' ? 'bg-slate-900 text-white' : 'bg-white'}`}
        >
          Filipino
        </button>
      </div>

      <Suspense fallback={<p>Loading…</p>}>
        <article className="prose max-w-none whitespace-pre-wrap">
          {tab === 'en' ? (en || 'Policy (EN) not found.') : (tl || 'Patakaran (FIL) not found.')}
        </article>
      </Suspense>
    </>
  );
}
