import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProductCard } from "@/components/store/ProductCard";
import { getCategory, productsInCategory } from "@/lib/catalog";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.category.name ?? "القسم";
    const desc = loaderData ? `تسوق ${name} من روعة اللحوم: ${loaderData.category.blurb}، مع توصيل مبرد.` : "أقسام روعة اللحوم";
    return {
      meta: [
        { title: `${name} | روعة اللحوم` },
        { name: "description", content: desc },
        { property: "og:title", content: `${name} | روعة اللحوم` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const products = productsInCategory(category.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <header className="mb-10 text-center">
        <h1 className="section-title text-3xl sm:text-4xl">{category.name}</h1>
        <p className="mt-3 text-muted-foreground">{category.blurb}</p>
      </header>
      {products.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">لا توجد منتجات في هذا القسم حالياً.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
