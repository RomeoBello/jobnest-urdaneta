// components/FaqList.tsx
type QA = { q: string; a: string };

export default function FaqList({ items }: { items: QA[] }) {
  // Uses native <details> for simple, accessible accordion
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details
          key={i}
          className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm open:shadow-md transition"
        >
          <summary className="cursor-pointer select-none font-medium text-slate-800 list-none flex items-center justify-between">
            <span>{item.q}</span>
            <span className="ml-3 text-slate-400 group-open:rotate-180 transition">
              ▼
            </span>
          </summary>
          <div className="mt-2 text-slate-600 leading-relaxed">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}
