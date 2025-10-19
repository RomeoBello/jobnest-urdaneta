'use client';
import { useState, Suspense } from 'react';

export default function PolicyTabs({ en, tl }: { en: string; tl: string }) {
  const [tab, setTab] = useState<'en' | 'tl'>('en');
  return (
    <>
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setTab('en')}
          className={`px-3 py-1 rounded border ${tab==='en' ? 'bg-slate-900 text-white' : 'bg-white'}`}
        >English</button>
        <button
          onClick={() => setTab('tl')}
          className={`px-3 py-1 rounded border ${tab==='tl' ? 'bg-slate-900 text-white' : 'bg-white'}`}
        >Filipino</button>
      </div>

      <Suspense fallback={<p>Loading…</p>}>
        <article className="prose max-w-none whitespace-pre-wrap">
          {tab === 'en' ? (en || 'English version not found.') : (tl || 'Filipino version not found.')}
        </article>
      </Suspense>
    </>
  );
}
