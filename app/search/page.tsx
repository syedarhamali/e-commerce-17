"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useState } from "react";
import {
  AlertCircle,
  Loader2,
  PackageOpen,
  Search,
} from "lucide-react";
import PageShell from "../components/PageShell";
import ProductCard from "../components/ProductCard";
import { searchProducts } from "../../services/api";
import { Product } from "../../types/product";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(!!initialQuery);
  const [searched, setSearched] = useState(!!initialQuery);
  const [error, setError] = useState("");

  const runSearch = async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const data = await searchProducts(trimmed);
      setResults(data);
    } catch {
      setError("Search failed. Is the backend running?");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      runSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    runSearch(trimmed);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
      <div className="max-w-2xl mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Search Listings
        </h1>
        <p className="text-gray-500 mt-2">
          Find products by title, description, or category
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-10">
        <div className="flex items-center bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100 transition">
          <div className="px-4 text-gray-400">
            <Search size={22} />
          </div>
          <input
            type="text"
            placeholder="Search products, cars, mobiles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 py-4 outline-none text-gray-700"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white px-8 py-4 font-semibold m-1 rounded-xl transition"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Search"}
          </button>
        </div>
      </form>

      {error && (
        <div className="flex items-center gap-3 bg-red-50 text-red-700 px-5 py-4 rounded-2xl mb-8">
          <AlertCircle size={20} />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl h-72 skeleton border border-gray-200"
            />
          ))}
        </div>
      ) : searched && results.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-200">
          <PackageOpen className="mx-auto text-gray-300" size={56} />
          <p className="text-xl font-bold text-gray-700 mt-6">No results found</p>
          <p className="text-gray-500 mt-2">
            Try different keywords or{" "}
            <Link href="/sell" className="text-emerald-600 font-medium">
              list your own item
            </Link>
          </p>
        </div>
      ) : results.length > 0 ? (
        <>
          <p className="text-gray-500 mb-6">
            {results.length} result{results.length !== 1 ? "s" : ""} for{" "}
            <span className="font-semibold text-gray-800">
              &ldquo;{initialQuery || query}&rdquo;
            </span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {results.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.thumbnail}
                category={product.category}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <Search className="mx-auto mb-4" size={48} />
          <p className="text-lg">Enter a search term to get started</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <PageShell>
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-32">
            <Loader2 className="animate-spin text-emerald-600" size={32} />
          </div>
        }
      >
        <SearchContent />
      </Suspense>
    </PageShell>
  );
}
