import PageShell from "../../components/PageShell";

export default function ProductLoading() {
  return (
    <PageShell>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="h-6 w-32 skeleton rounded-lg mb-6" />
        <div className="bg-white rounded-3xl p-8 grid md:grid-cols-2 gap-10">
          <div className="h-[450px] skeleton rounded-2xl" />
          <div className="space-y-4 py-8">
            <div className="h-8 w-24 skeleton rounded-full" />
            <div className="h-12 skeleton rounded-xl w-3/4" />
            <div className="h-24 skeleton rounded-xl" />
            <div className="h-16 skeleton rounded-2xl w-1/2" />
            <div className="flex gap-4 mt-8">
              <div className="h-14 flex-1 skeleton rounded-2xl" />
              <div className="h-14 flex-1 skeleton rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
