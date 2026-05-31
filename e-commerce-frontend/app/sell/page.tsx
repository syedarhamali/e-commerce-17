"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  CheckCircle2,
  ImagePlus,
  Loader2,
  Sparkles,
  X,
} from "lucide-react";
import PageShell from "../components/PageShell";
import { createProduct } from "../../services/api";
import { CATEGORIES } from "../../lib/constants";

export default function SellPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!image) {
      setError("Please select a product image");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("image", image);

    setLoading(true);

    try {
      const product = await createProduct(formData);
      setSuccess(true);
      setTimeout(() => router.push(`/product/${product.id}`), 1200);
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;
      setError(message || "Failed to create product. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell>
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
        <div className="mb-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles size={16} />
            List in under 2 minutes
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Sell Your Product
          </h1>
          <p className="text-gray-500 mt-2">
            Upload a photo — it goes straight to Cloudinary — and reach buyers
            instantly.
          </p>
        </div>

        {success ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center animate-fade-up">
            <CheckCircle2 className="mx-auto text-emerald-500" size={64} />
            <h2 className="text-2xl font-bold text-gray-900 mt-6">
              Listed successfully!
            </h2>
            <p className="text-gray-500 mt-2">Redirecting to your product...</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-10 space-y-7 animate-fade-up"
          >
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium border border-red-100">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Product Photo
              </label>
              <div className="relative">
                <label className="flex flex-col items-center justify-center w-full h-56 md:h-64 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/30 transition overflow-hidden group">
                  {preview ? (
                    <>
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          Click to change
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center text-gray-400 py-8">
                      <div className="bg-emerald-50 p-4 rounded-2xl mb-3">
                        <ImagePlus className="text-emerald-600" size={36} />
                      </div>
                      <span className="font-semibold text-gray-600">
                        Click to upload image
                      </span>
                      <span className="text-xs mt-1">PNG, JPG up to 5MB</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                {preview && (
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow hover:bg-white transition"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Title
              </label>
              <input
                name="title"
                required
                placeholder="e.g. iPhone 15 Pro Max — 256GB"
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                required
                rows={4}
                placeholder="Condition, features, reason for selling..."
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 resize-none transition"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Price (USD)
                </label>
                <input
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  placeholder="99.99"
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  required
                  defaultValue=""
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-white transition"
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 transition"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={22} />
                  Uploading to Cloudinary...
                </>
              ) : (
                "Publish Listing"
              )}
            </button>
          </form>
        )}
      </div>
    </PageShell>
  );
}
