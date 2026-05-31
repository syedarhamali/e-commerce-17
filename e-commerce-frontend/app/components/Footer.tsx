import Link from "next/link";
import { ShoppingBag, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-emerald-600 p-2 rounded-xl">
                <ShoppingBag className="text-white" size={20} />
              </div>
              <span className="text-xl font-extrabold">
                OLX <span className="text-emerald-400">PRO</span>
              </span>
            </div>
            <p className="text-gray-400 max-w-sm leading-relaxed">
              Your trusted marketplace to buy and sell cars, mobiles,
              electronics, furniture, and more — with secure Cloudinary image
              uploads.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition">
                  Browse Products
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-emerald-400 transition">
                  Sell an Item
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="hover:text-emerald-400 transition"
                >
                  Search
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-400">
              {["Electronics", "Mobiles", "Vehicles", "Fashion"].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/?category=${cat.toLowerCase()}`}
                    className="hover:text-emerald-400 transition"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} OLX PRO Marketplace. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Mail size={14} /> support@olxpro.com
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={14} /> Batch 17 Project
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
