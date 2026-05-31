export const CATEGORIES = [
  { id: "all", label: "All", icon: "🏷️" },
  { id: "electronics", label: "Electronics", icon: "💻" },
  { id: "mobiles", label: "Mobiles", icon: "📱" },
  { id: "furniture", label: "Furniture", icon: "🛋️" },
  { id: "fashion", label: "Fashion", icon: "👗" },
  { id: "vehicles", label: "Vehicles", icon: "🚗" },
  { id: "books", label: "Books", icon: "📚" },
  { id: "other", label: "Other", icon: "📦" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: price % 1 === 0 ? 0 : 2,
  }).format(price);
}
