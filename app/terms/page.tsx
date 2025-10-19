export const runtime = 'nodejs';
export const revalidate = 60 * 60;

import fs from 'fs/promises';
import path from 'path';

async function read(rel: string) {
  return fs.readFile(path.join(process.cwd(), rel), 'utf8');
}

export default async function TermsPage() {
  const en = await read('legal/Terms_of_Use_PH_EN.txt');
  const fil = await read('legal/Terms_of_Use_PH_FIL.txt');

  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms of Use</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="font-semibold text-xl mb-2">English</h2>
          <pre className="whitespace-pre-wrap">{en}</pre>
        </section>
        <section>
          <h2 className="font-semibold text-xl mb-2">Filipino</h2>
          <pre className="whitespace-pre-wrap">{fil}</pre>
        </section>
      </div>
    </main>
  );
}
