// app/pricing/page.tsx
"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface PricingData {
  government_monthly: number;
  government_perClick: number;
  gocc_monthly: number;
  gocc_perClick: number;
  commercial_monthly: number;
  commercial_perClick: number;
  personal_monthly: number;
  personal_perClick: number;
}

export default function PricingPage() {
  const [pricing, setPricing] = useState<PricingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const docRef = doc(db, "pricing", "main");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPricing(docSnap.data() as PricingData);
        } else {
          setError("No pricing data found in Firestore.");
        }
      } catch (err) {
        console.error("Firestore fetch error:", err);
        setError("Failed to load pricing data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
  }, []);

  if (loading)
    return (
      <div className="text-center py-10 text-gray-600">
        Loading pricing information...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-10 text-red-600 font-medium">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">
        Pricing
      </h1>

      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full text-left border">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Monthly Rate (₱)</th>
              <th className="py-3 px-4">Per Click (₱)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3 px-4 font-medium">Government</td>
              <td className="py-3 px-4">{pricing?.government_monthly}</td>
              <td className="py-3 px-4">{pricing?.government_perClick}</td>
            </tr>
            <tr className="border-b bg-gray-50">
              <td className="py-3 px-4 font-medium">GOCC</td>
              <td className="py-3 px-4">{pricing?.gocc_monthly}</td>
              <td className="py-3 px-4">{pricing?.gocc_perClick}</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4 font-medium">Commercial</td>
              <td className="py-3 px-4">{pricing?.commercial_monthly}</td>
              <td className="py-3 px-4">{pricing?.commercial_perClick}</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-medium">Personal</td>
              <td className="py-3 px-4">{pricing?.personal_monthly}</td>
              <td className="py-3 px-4">{pricing?.personal_perClick}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
