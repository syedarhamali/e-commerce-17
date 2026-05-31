import PageShell from "./components/PageShell";
import Hero from "./components/Hero";
import Featured from "./components/Featured";
import ProductGrid from "./components/ProductGrid";

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <Featured />
      <ProductGrid />
    </PageShell>
  );
}
