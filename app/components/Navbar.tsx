"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FormEvent, useState } from "react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    setMobileOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/search", label: "Browse" },
    { href: "/sell", label: "Sell" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="bg-emerald-600 p-2 rounded-xl shadow-md shadow-emerald-200">
              <ShoppingBag className="text-white" size={22} />
            </div>
            <span className="text-2xl font-extrabold text-gray-900">
              OLX <span className="text-emerald-600">PRO</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                  pathname === link.href
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl"
          >
            <div className="flex items-center w-full bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100 transition">
              <div className="px-4 text-gray-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search products, cars, mobiles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent px-1 py-2.5 outline-none text-gray-700 placeholder:text-gray-400 text-sm"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 transition px-5 py-2.5 text-white text-sm font-semibold m-1 rounded-xl"
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex items-center gap-2 shrink-0">
            <button className="hidden md:flex items-center gap-2 border border-gray-200 hover:border-emerald-400 hover:text-emerald-700 px-4 py-2.5 rounded-xl transition text-sm font-medium text-gray-700">
              <User size={17} />
              Login
            </button>

            <Link
              href="/sell"
              className="hidden sm:flex bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-2xl text-sm font-semibold shadow-lg shadow-emerald-200 transition"
            >
              + Sell Now
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl border border-gray-200 text-gray-600"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden mt-4 pb-2 space-y-3 animate-fade-up">
            <form onSubmit={handleSearch}>
              <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-3 text-gray-400">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 py-3 outline-none text-sm bg-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-3 bg-emerald-600 text-white text-sm font-semibold"
                >
                  Go
                </button>
              </div>
            </form>

            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl font-medium ${
                    pathname === link.href
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/sell"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-center"
              >
                + Sell Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
