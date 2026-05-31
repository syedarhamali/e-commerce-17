"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../../services/api";
import { Product } from "../../types/product";

export default function Featured() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts(8).then((data) => setProducts(data.slice(0, 4)));
  }, []);

  if (!products.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">
            Trending
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">
            Featured Listings
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {products.map((product) => (
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
    </section>
  );
}
