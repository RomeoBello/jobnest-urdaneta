'use client';
import React from 'react';

// --- Types ---
type Category = 'government' | 'gocc' | 'commercial' | 'personal';

type Plan = {
  monthly: number;
  perClick: number;
  trialDays?: number;
  label?: string;
};

type Prices = Record<Category, Plan>;
type Field = keyof Plan;

export default function AdminPricingPage() {
  const [prices, setPrices] = React.useState<Prices>({
    government: { monthly: 0, perClick: 0, trialDays: 0, label: '' },
    gocc: { monthly: 0, perClick: 0, trialDays: 0, label: '' },
    commercial: { monthly: 0, perClick: 0, trialDays: 0, label: '' },
    personal: { monthly: 0, perClick: 0, trialDays: 0, label: '' },
  });

  const handleChange = (category: Category, field: Field, value: string | number) => {
    const parsed = field === 'label' ? value : value === '' ? '' : Number(value);
    setPrices(prev => ({
      ...prev,
      [category]: { ...prev[category], [field]: parsed },
    }));
  };

  const categories: Category[] = ['government', 'gocc', 'commercial', 'personal'];
  const fields: Field[] = ['monthly', 'perClick', 'trialDays', 'label'];

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-brandNavy">
        Admin Pricing Management
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map(cat => (
          <div key={cat} className="border rounded-xl p-4 shadow-md bg-white">
            <h2 className="text-xl font-semibold mb-4 text-brandNavy capitalize">{cat}</h2>
            {fields.map(field => (
              <div key={field} className="mb-3">
                <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                  {field}
                </label>
                <input
                  type={field === 'label' ? 'text' : 'number'}
                  value={(prices[cat][field] as any) ?? ''}
                  onChange={e => handleChange(cat, field, e.target.value)}
                  className="w-full border rounded-lg px-2 py-1"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
