import Link from "next/link";
import { Home, Search } from "lucide-react";
import PageShell from "./components/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <p className="text-8xl font-extrabold text-emerald-600">404</p>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4">
          Page not found
        </h1>
        <p className="text-gray-500 mt-2 max-w-md">
          The page or product you&apos;re looking for doesn&apos;t exist or may
          have been removed.
        </p>
        <div className="flex gap-4 mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-semibold transition"
          >
            <Home size={18} />
            Go Home
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 border border-gray-300 hover:border-gray-900 px-6 py-3 rounded-2xl font-semibold transition"
          >
            <Search size={18} />
            Search
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
