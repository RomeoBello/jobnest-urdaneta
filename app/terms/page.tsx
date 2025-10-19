export const runtime = 'nodejs';
export const revalidate = 60 * 60;

import fs from 'fs/promises';
import path from 'path';
import type { Metadata } from 'next';
import PolicyTabs from '../policy/PolicyTabs';

export const metadata: Metadata = {
  title: 'Terms of Use · JobNest Urdaneta City',
  description: 'Read JobNest Urdaneta City’s Terms of Use in English and Filipino.',
};

async function read(rel: string) {
  return fs.readFile(path.join(process.cwd(), rel), 'utf8');
}

async function getTerms() {
  const en =
    (await read('legal/Terms_of_Use_EN1.txt').catch(() => null)) ??
    (await read('legal/Terms_of_Use_EN.txt').catch(() => null)) ??
    (await read('legal/Terms_EN.txt').catch(() => null)) ??
    '';

  const tl =
    (await read('legal/Terms_of_Use_FI1.txt').catch(() => null)) ??
    (await read('legal/Terms_of_Use_FIL.txt').catch(() => null)) ??
    (await read('legal/Terms_FIL.txt').catch(() => null)) ??
    '';

  return { en, tl };
}

export default async function TermsPage() {
  const { en, tl } = await getTerms();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
      <PolicyTabs en={en} tl={tl} />
    </main>
  );
}
