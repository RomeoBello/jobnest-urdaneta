export const runtime = 'nodejs';

import fs from 'fs';
import path from 'path';
import LanguageSelect from '@/components/LanguageSelect';

function readTxt(name: string) {
  try {
    const p = path.join(process.cwd(), 'public', 'legal', name);
    return fs.readFileSync(p, 'utf8');
  } catch {
    return 'Sorry, this document is temporarily unavailable.';
  }
}

export default function Privacy({ searchParams }: { searchParams: { lang?: string } }) {
  const lang = searchParams?.lang === 'fil' ? 'fil' : 'en';
  const body = lang === 'fil' ? readTxt('Privacy_fil.txt') : readTxt('Privacy_en.txt');

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
      <LanguageSelect />
      <article className="prose max-w-none prose-slate whitespace-pre-line">
        {body}
      </article>
    </div>
  );
}
