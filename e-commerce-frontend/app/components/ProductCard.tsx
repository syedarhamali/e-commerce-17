"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatPrice } from "../../lib/constants";

type Props = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

export default function ProductCard({
  id,
  title,
  price,
  image,
  category,
}: Props) {
  return (
    <Link href={`/product/${id}`} className="group block">
      <article className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50 hover:-translate-y-1 transition-all duration-300">
        <div className="relative overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={title}
            className="h-56 w-full object-cover group-hover:scale-105 transition duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className="text-xs font-bold bg-white/90 backdrop-blur text-emerald-700 px-3 py-1 rounded-full capitalize shadow-sm">
              {category}
            </span>
          </div>
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
            <span className="bg-gray-900/80 text-white p-2 rounded-full">
              <ArrowUpRight size={16} />
            </span>
          </div>
        </div>

        <div className="p-5">
          <h2 className="text-base font-bold text-gray-800 line-clamp-2 min-h-[2.5rem] group-hover:text-emerald-700 transition">
            {title}
          </h2>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-xl font-extrabold text-emerald-600">
              {formatPrice(price)}
            </p>
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg group-hover:bg-emerald-50 group-hover:text-emerald-700 transition">
              View →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
