import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import PageShell from "../../components/PageShell";
import ProductDetailView from "./ProductDetailView";
import { getProductById } from "../../../services/api";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetail({ params }: Props) {
  const { id } = await params;

  let product = null;

  try {
    product = await getProductById(id);
  } catch {
    product = null;
  }

  if (!product) {
    notFound();
  }

  return (
    <PageShell>
      <div className="py-8 md:py-12 px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium mb-6 max-w-6xl mx-auto"
        >
          <ChevronLeft size={18} />
          Back to listings
        </Link>
        <ProductDetailView product={product} />
      </div>
    </PageShell>
  );
}
