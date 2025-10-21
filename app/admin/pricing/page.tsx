"use client";
import { useState } from "react";

export default function AdminPricing() {
  const [prices, setPrices] = useState({
    government: { monthly: 0, click: 0 },
    gocc: { monthly: 50, click: 0.1 },
    commercial: { monthly: 50, click: 0.1 },
    personal: { monthly: 0, click: 0.1 },
  });

  const handleChange = (category, field, value) => {
    setPrices((prev) => ({
      ...prev,
      [category]: { ...prev[category], [field]: value },
    }));
  };

  const handleSave = () => {
    alert("✅ Pricing updated successfully!\n(Connect to Firestore later)");
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-[#0A2D4A] mb-8">
        Admin Pricing Settings
      </h1>
      <p className="text-center text-slate-600 mb-10">
        Update pricing dynamically for each customer type. Future versions can
        sync these changes to Firestore automatically.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {Object.entries(prices).map(([type, data]) => (
          <div
            key={type}
            className="rounded-2xl shadow-md border border-slate-200 p-6 bg-white"
          >
            <h2 className="text-2xl font-semibold capitalize text-[#0A2D4A] mb-4">
              {type} Pricing
            </h2>

            <label className="block text-sm text-slate-600 mb-1">
              Monthly Rate (₱)
            </label>
            <input
              type="number"
              step="0.01"
              value={data.monthly}
              onChange={(e) =>
                handleChange(type, "monthly", parseFloat(e.target.value))
              }
              className="w-full mb-3 p-2 border border-slate-300 rounded-md"
            />

            <label className="block text-sm text-slate-600 mb-1">
              Pay-per-click Rate (₱)
            </label>
            <input
              type="number"
              step="0.01"
              value={data.click}
              onChange={(e) =>
                handleChange(type, "click", parseFloat(e.target.value))
              }
              className="w-full mb-3 p-2 border border-slate-300 rounded-md"
            />

            <div className="text-slate-500 text-sm mt-3">
              💡 {type === "personal"
                ? "Free posting, ₱0.10 per valid click."
                : "Regular monthly plan with per-click cost."}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={handleSave}
          className="bg-[#D9A441] hover:bg-[#c79038] text-white font-bold py-3 px-8 rounded-lg shadow-md transition"
        >
          Save Pricing
        </button>
      </div>

      <div className="text-center mt-10 text-slate-500 text-sm">
        <p>
          ⚙️ Future update: integrate GCash/Maya auto-deduction and display
          pricing promos dynamically.
        </p>
      </div>
    </section>
  );
}
