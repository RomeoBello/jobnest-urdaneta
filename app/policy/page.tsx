import fs from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs';
export const revalidate = 60 * 60; // revalidate hourly

async function read(rel: string) {
  const full = path.join(process.cwd(), rel);
  return fs.readFile(full, 'utf8');
}

export default async function PolicyPage() {
  const en = await read('legal/Privacy_Policy_PH_EN.txt');
  const fil = await read('legal/Privacy_Policy_PH_FIL.txt');

  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
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
