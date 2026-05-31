import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-teal-300 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
        <div className="max-w-3xl animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles size={16} />
            Trusted marketplace · Cloud-powered listings
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Buy & Sell Anything,{" "}
            <span className="text-emerald-100">Faster.</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/90 leading-relaxed max-w-xl">
            Cars, mobiles, electronics, furniture and more — list in minutes
            with photo uploads powered by Cloudinary.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 bg-white text-emerald-700 px-7 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition duration-200"
            >
              Browse Listings
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/sell"
              className="inline-flex items-center gap-2 border-2 border-white/40 hover:bg-white/10 px-7 py-4 rounded-2xl font-bold transition duration-200"
            >
              Start Selling
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-md">
            {[
              { value: "10K+", label: "Listings" },
              { value: "50+", label: "Categories" },
              { value: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-extrabold">{stat.value}</p>
                <p className="text-sm text-white/70 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
