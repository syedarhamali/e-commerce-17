"use client";

import { useState } from "react";
import { Product } from "../../../types/product";
import { formatPrice } from "../../../lib/constants";

type Props = {
  product: Product;
};

export default function ProductDetailView({ product }: Props) {
  const images =
    product.images?.length > 0 ? product.images : [product.thumbnail];
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden grid md:grid-cols-2 gap-8 md:gap-12 p-6 md:p-10">
      <div>
        <div className="rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
          <img
            src={activeImage}
            alt={product.title}
            className="w-full h-[320px] md:h-[450px] object-cover"
          />
        </div>

        {images.length > 1 && (
          <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
            {images.map((img) => (
              <button
                key={img}
                onClick={() => setActiveImage(img)}
                className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                  activeImage === img
                    ? "border-emerald-500 ring-2 ring-emerald-200"
                    : "border-gray-200 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center">
        <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full w-fit capitalize text-sm font-semibold">
          {product.category}
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-5 leading-tight">
          {product.title}
        </h1>

        <p className="text-gray-500 mt-5 leading-8 text-base md:text-lg">
          {product.description}
        </p>

        <div className="mt-8 p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
          <p className="text-sm text-emerald-700 font-medium">Price</p>
          <p className="text-3xl md:text-4xl font-extrabold text-emerald-600 mt-1">
            {formatPrice(product.price)}
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold transition shadow-lg shadow-emerald-200">
            Buy Now
          </button>
          <button className="flex-1 border-2 border-gray-200 hover:border-gray-900 px-8 py-4 rounded-2xl font-semibold transition">
            Chat Seller
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Listing ID</p>
            <p className="font-semibold text-gray-700 mt-1">#{product.id}</p>
          </div>
          <div>
            <p className="text-gray-400">Category</p>
            <p className="font-semibold text-gray-700 mt-1 capitalize">
              {product.category}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
