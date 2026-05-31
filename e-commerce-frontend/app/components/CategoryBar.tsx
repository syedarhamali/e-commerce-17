"use client";

type Props = {
  active: string;
  onChange: (category: string) => void;
};

const categories = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "electronics", label: "Electronics", emoji: "💻" },
  { id: "mobiles", label: "Mobiles", emoji: "📱" },
  { id: "furniture", label: "Furniture", emoji: "🛋️" },
  { id: "fashion", label: "Fashion", emoji: "👗" },
  { id: "vehicles", label: "Vehicles", emoji: "🚗" },
  { id: "books", label: "Books", emoji: "📚" },
  { id: "other", label: "Other", emoji: "📦" },
];

export default function CategoryBar({ active, onChange }: Props) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`flex items-center gap-2 shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
            active === cat.id
              ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-105"
              : "bg-white text-gray-600 border border-gray-200 hover:border-emerald-400 hover:text-emerald-700"
          }`}
        >
          <span>{cat.emoji}</span>
          {cat.label}
        </button>
      ))}
    </div>
  );
}
