export const runtime = 'nodejs';

import fs from 'fs';
import path from 'path';
import LanguageSelect from '@/components/LanguageSelect';

function readLegal(name: string) {
  const p = path.join(process.cwd(), 'legal', name);
  return fs.readFileSync(p, 'utf8');
}

export default function Privacy({
  searchParams,
}: {
  searchParams: { lang?: string };
}) {
  const selected = searchParams?.lang === 'fil' ? 'fil' : 'en';
  const en = readLegal('privacy_en.txt');
  const fil = readLegal('privacy_fil.txt');
  const body = selected === 'fil' ? fil : en;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-extrabold text-brandNavy">Privacy Policy</h1>
      <LanguageSelect selected={selected as 'en' | 'fil'} />
      <article className="prose max-w-none prose-slate">
        {body.split('\n').map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </article>
    </div>
  );
}
