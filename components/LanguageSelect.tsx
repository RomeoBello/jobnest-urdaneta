// components/LanguageSelect.tsx
'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

type Props = {
  selected?: 'en' | 'fil';
};

export default function LanguageSelect({ selected }: Props) {
  const pathname = usePathname();
  const params = useSearchParams();
  const current = selected ?? (params.get('lang') === 'fil' ? 'fil' : 'en');

  const makeHref = (lang: 'en' | 'fil') => {
    const sp = new URLSearchParams(Array.from(params.entries()));
    sp.set('lang', lang);
    return `${pathname}?${sp.toString()}`;
  };

  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="text-sm font-semibold text-slate-600">Language:</span>
      <Link
        href={makeHref('en')}
        className={`px-3 py-1 rounded-full border text-sm ${
          current === 'en'
            ? 'bg-brandNavy text-white border-brandNavy'
            : 'bg-white text-brandNavy border-slate-300 hover:border-brandNavy'
        }`}
      >
        English
      </Link>
      <Link
        href={makeHref('fil')}
        className={`px-3 py-1 rounded-full border text-sm ${
          current === 'fil'
            ? 'bg-brandNavy text-white border-brandNavy'
            : 'bg-white text-brandNavy border-slate-300 hover:border-brandNavy'
        }`}
      >
        Tagalog
      </Link>
    </div>
  );
}
