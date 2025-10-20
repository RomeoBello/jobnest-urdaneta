'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

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

  const buttons = [
    { lang: 'en', label: 'English', flag: '🇬🇧' },
    { lang: 'fil', label: 'Tagalog', flag: '🇵🇭' },
  ];

  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between border border-slate-200 rounded-2xl p-4 bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <Globe className="text-[#0A2D4A]" size={20} />
        <span className="text-slate-700 font-semibold text-sm tracking-wide">
          Choose Language
        </span>
      </div>

      <div className="flex gap-3 mt-3 sm:mt-0">
        {buttons.map(({ lang, label, flag }) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={lang}
          >
            <Link
              href={href(lang as Lang)}
              className={[
                'flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-sm font-medium shadow-sm',
                current === lang
                  ? 'bg-[#0A2D4A] text-white border-[#0A2D4A]'
                  : 'bg-white text-[#0A2D4A] border-slate-300 hover:border-[#D9A441]'
              ].join(' ')}
            >
              <span>{flag}</span> {label}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
