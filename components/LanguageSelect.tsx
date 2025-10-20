'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

type Lang = 'en' | 'fil';

export default function LanguageSelect() {
  const pathname = usePathname();
  const params = useSearchParams();
  const current: Lang = params.get('lang') === 'fil' ? 'fil' : 'en';

  const href = (lang: Lang) => {
    const sp = new URLSearchParams(Array.from(params.entries()));
    sp.set('lang', lang);
    return `${pathname}?${sp.toString()}`;
  };

  const btn = (lang: Lang, label: string) =>
    (
      <Link
        href={href(lang)}
        className={[
          'px-3 py-1 rounded-full border text-sm transition',
          current === lang
            ? 'bg-slate-900 text-white border-slate-900'
            : 'bg-white text-slate-900 border-slate-300 hover:border-slate-900'
        ].join(' ')}
      >
        {label}
      </Link>
    );

  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="text-sm font-semibold text-slate-600">Language:</span>
      {btn('en', 'English')}
      {btn('fil', 'Tagalog')}
    </div>
  );
}
