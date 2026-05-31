"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertCircle, PackageOpen, RefreshCw, Search } from "lucide-react";
import ProductCard from "./ProductCard";
import CategoryBar from "./CategoryBar";
import { getProducts } from "../../services/api";
import { Product } from "../../types/product";

function ProductSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-200">
      <div className="h-56 skeleton" />
      <div className="p-5 space-y-3">
        <div className="h-4 skeleton rounded-lg w-3/4" />
        <div className="h-4 skeleton rounded-lg w-1/2" />
        <div className="h-8 skeleton rounded-lg w-1/3 mt-4" />
      </div>
    </div>
  );
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getProducts(40);
      setProducts(data);
    } catch {
      setError("Could not load products. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;

    if (category !== "all") {
      result = result.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    setFilteredProducts(result);
  }, [search, category, products]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="mb-8">
        <CategoryBar active={category} onChange={setCategory} />
      </div>

      <div className="flex items-center bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm mb-8 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100 transition">
        <div className="px-4 text-gray-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Filter by name or category..."
          className="w-full p-4 outline-none text-gray-700 placeholder:text-gray-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && (
        <div className="flex items-center justify-between gap-4 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl mb-8">
          <div className="flex items-center gap-3">
            <AlertCircle size={20} />
            <p className="text-sm font-medium">{error}</p>
          </div>
          <button
            onClick={fetchProducts}
            className="flex items-center gap-2 text-sm font-semibold bg-red-100 hover:bg-red-200 px-4 py-2 rounded-xl transition shrink-0"
          >
            <RefreshCw size={14} />
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {[...Array(8)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-200">
          <PackageOpen className="mx-auto text-gray-300" size={56} />
          <p className="text-xl font-bold text-gray-700 mt-6">
            {products.length === 0 ? "No products yet" : "No matches found"}
          </p>
          <p className="text-gray-500 mt-2 max-w-sm mx-auto">
            {products.length === 0
              ? "Be the first to list an item on OLX PRO!"
              : "Try a different search or category filter."}
          </p>
          <Link
            href="/sell"
            className="inline-block mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-semibold transition"
          >
            + List Your First Product
          </Link>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Fresh Recommendations
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Hand-picked listings from our community
              </p>
            </div>
            <p className="text-sm font-semibold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full">
              {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {filteredProducts.map((product, i) => (
              <div
                key={product.id}
                className="animate-fade-up"
                style={{ animationDelay: `${Math.min(i * 50, 400)}ms` }}
              >
                <ProductCard
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.thumbnail}
                  category={product.category}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
