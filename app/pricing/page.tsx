'use client';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Pricing() {
  const [pricing, setPricing] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const ref = doc(db, 'pricing', 'main');
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setPricing(snap.data());
        }
      } catch (error) {
        console.error('Error fetching pricing:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPricing();
  }, []);

  if (loading) {
    return (
      <main className="p-10 text-center">
        <h1 className="text-3xl font-bold text-brandNavy mb-4">Pricing</h1>
        <p className="text-gray-600">Connecting to Firestore pricing...</p>
      </main>
    );
  }

  if (!pricing) {
    return (
      <main className="p-10 text-center">
        <h1 className="text-3xl font-bold text-brandNavy mb-4">Pricing</h1>
        <p className="text-red-500">No pricing data found in Firestore.</p>
      </main>
    );
  }

  const format = (value: number) => `₱${value.toLocaleString()}`;

  return (
    <main className="p-10 text-center">
      <h1 className="text-3xl font-bold text-brandNavy mb-6">Pricing</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        <div className="border p-4 rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-2 text-brandNavy">Government</h2>
          <p>Monthly: {format(pricing.government_monthly)}</p>
          <p>Per Click: {format(pricing.government_perClick)}</p>
        </div>
        <div className="border p-4 rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-2 text-brandNavy">GOCC</h2>
          <p>Monthly: {format(pricing.gocc_monthly)}</p>
          <p>Per Click: {format(pricing.gocc_perClick)}</p>
        </div>
        <div className="border p-4 rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-2 text-brandNavy">Commercial</h2>
          <p>Monthly: {format(pricing.commercial_monthly)}</p>
          <p>Per Click: {format(pricing.commercial_perClick)}</p>
        </div>
        <div className="border p-4 rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-2 text-brandNavy">Personal</h2>
          <p>Monthly: {format(pricing.personal_monthly)}</p>
          <p>Per Click: {format(pricing.personal_perClick)}</p>
        </div>
      </div>
    </main>
  );
}
