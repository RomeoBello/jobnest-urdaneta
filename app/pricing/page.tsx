"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type PricingDoc = {
  government_monthly: number;
  government_perClick: number;
  gocc_monthly: number;
  gocc_perClick: number;
  commercial_monthly: number;
  commercial_perClick: number;
  personal_monthly: number;
  personal_perClick: number;
};

const peso = (n: number) => (n === 0 ? "Free" : `₱${n}`);

export default function PricingPage() {
  const [data, setData] = useState<PricingDoc | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDoc(doc(db, "pricing", "main"));
        if (!snap.exists()) {
          setErr("No pricing data found.");
        } else {
          setData(snap.data() as PricingDoc);
        }
      } catch (e: any) {
        setErr(e?.message || "Failed to load pricing data.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="max-w-4xl mx-auto py-16 text-center">Loading pricing…</div>;
  if (err) return <div className="max-w-4xl mx-auto py-16 text-center text-red-600">Failed to load pricing data.</div>;
  if (!data) return null;

  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-extrabold text-center text-slate-800 mb-8">Pricing</h1>
      <div className="overflow-hidden rounded-xl shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-indigo-900 text-white">
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Monthly Rate (₱)</th>
              <th className="text-left p-4">Per Click (₱)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-4 font-medium">Government</td>
              <td className="p-4">{peso(data.government_monthly)}</td>
              <td className="p-4">{peso(data.government_perClick)}</td>
            </tr>
            <tr className="border-b bg-slate-50">
              <td className="p-4 font-medium">GOCC</td>
              <td className="p-4">{peso(data.gocc_monthly)}</td>
              <td className="p-4">{peso(data.gocc_perClick)}</td>
            </tr>
            <tr className="border-b">
              <td className="p-4 font-medium">Commercial</td>
              <td className="p-4">{peso(data.commercial_monthly)}</td>
              <td className="p-4">{peso(data.commercial_perClick)}</td>
            </tr>
            <tr>
              <td className="p-4 font-medium">Personal</td>
              <td className="p-4">{peso(data.personal_monthly)}</td>
              <td className="p-4">{peso(data.personal_perClick)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-slate-500 mt-4">
        Edit values in Firestore: collection <code>pricing</code>, doc <code>main</code>. Any 0 is shown as “Free”.
      </p>
    </main>
  );
}
