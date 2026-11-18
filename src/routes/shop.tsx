import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ProductCard } from "@/components/store/ProductCard";
import { PRODUCTS } from "@/lib/catalog";

export const Route = createFileRoute("/shop")({
  validateSearch: z.object({ q: z.string().max(80).optional() }),
  head: () => ({
    meta: [
      { title: "جميع المنتجات | روعة اللحوم" },
      { name: "description", content: "تصفح جميع منتجات روعة اللحوم من لحوم الضأن والعجل والقطعيات والنقائق والهدايا." },
      { property: "og:title", content: "جميع المنتجات | روعة اللحوم" },
      { property: "og:description", content: "لحوم ضأن وعجل طازجة وقطعيات ونقائق بأسعار بالريال السعودي." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { q } = Route.useSearch();
  const term = q?.trim() ?? "";
  const results = term ? PRODUCTS.filter((p) => p.name.includes(term) || p.description.includes(term)) : PRODUCTS;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <header className="mb-10 text-center">
        <h1 className="section-title text-3xl sm:text-4xl">{term ? `نتائج البحث: ${term}` : "جميع المنتجات"}</h1>
        <p className="mt-3 text-muted-foreground">{results.length} منتج</p>
      </header>
      {results.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">لم نجد منتجات تطابق بحثك. جرّب كلمة أخرى مثل "عجل" أو "ضان".</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
