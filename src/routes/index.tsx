import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, BadgePercent, Handshake, Scissors, ShieldCheck, Snowflake } from "lucide-react";
import hero from "@/assets/hero-meat.svg";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/store/ProductCard";
import { WholesaleBanner } from "@/components/store/WholesaleBanner";
import { TrustStrip } from "@/components/store/SiteFooter";
import { CATEGORIES, PRODUCTS } from "@/lib/catalog";
import { whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "روعة اللحوم | لحوم طازجة بجودة تستحق الثقة" },
      { name: "description", content: "تسوق لحوم الضأن والعجل الطازجة والقطعيات والنقائق من روعة اللحوم، مع توصيل مبرد خلال 24 ساعة في السعودية." },
      { property: "og:title", content: "روعة اللحوم | لحوم طازجة بجودة تستحق الثقة" },
      { property: "og:description", content: "لحوم ضأن وعجل طازجة، تقطيع حسب الطلب وتوصيل مبرد سريع وآمن." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const TRUST = [
  { icon: Scissors, label: "تقطيع حسب الطلب" },
  { icon: BadgeCheck, label: "جودة عالية 100%" },
  { icon: ShieldCheck, label: "فحص صحي معتمد" },
  { icon: Snowflake, label: "توصيل مبرد سريع وآمن" },
];

function Index() {
  const featured = PRODUCTS.filter((p) => p.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img src={hero} alt="قطع لحم طازجة فاخرة" width={1920} height={1088} className="absolute inset-0 -z-10 h-full w-full object-cover object-left" />
        <div className="absolute inset-0 -z-10 bg-hero-fade" />
        <div className="absolute inset-0 -z-10 bg-background/55 sm:bg-transparent" />
        <div className="mx-auto flex min-h-[460px] max-w-7xl items-center px-4 py-14 sm:min-h-[540px]">
          <div className="animate-rise max-w-xl space-y-6">
            <h1 className="font-display text-5xl font-black leading-tight sm:text-7xl">
              <span className="text-primary-glow">روعة</span> اللحوم
            </h1>
            <p className="text-xl font-bold sm:text-3xl">لحوم طازجة بجودة تستحق الثقة</p>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {TRUST.map(({ icon: Icon, label }) => (
                <li key={label} className="flex flex-col items-center gap-2 text-center text-sm font-bold">
                  <Icon className="h-9 w-9 text-gold" strokeWidth={1.5} />
                  {label}
                </li>
              ))}
            </ul>
            <Button variant="hero" size="xl" asChild>
              <Link to="/shop" search={{ q: undefined }}>
                تسوق الآن <ArrowLeft />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {CATEGORIES.filter((c) => c.slug !== "gifts").map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 text-center shadow-card transition-all hover:-translate-y-1 hover:border-primary/60"
            >
              <div className="grid h-24 w-full place-items-center overflow-hidden rounded-xl bg-surface">
                {c.image ? (
                  <img src={c.image} alt="" loading="lazy" width={896} height={752} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                  <BadgePercent className="h-14 w-14 text-primary" strokeWidth={1.5} />
                )}
              </div>
              <h3 className="font-display text-base font-extrabold">{c.name}</h3>
              <p className="text-xs text-muted-foreground">{c.blurb}</p>
              <span className="mt-1 rounded-md bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground">تسوق الآن</span>
            </Link>
          ))}
          <a
            href={whatsappLink("مرحباً، أرغب في الاستفسار عن عروض الجملة")}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2 rounded-2xl border border-gold/40 bg-card p-4 text-center shadow-card transition-all hover:-translate-y-1 hover:border-gold"
          >
            <div className="grid h-24 w-full place-items-center rounded-xl bg-accent">
              <Handshake className="h-14 w-14 text-gold" strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-base font-extrabold">عروض الجملة</h3>
            <p className="text-xs text-muted-foreground">أسعار خاصة للكميات</p>
            <span className="mt-1 rounded-md border border-gold px-4 py-1.5 text-xs font-bold text-gold">تواصل الآن</span>
          </a>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 pb-6">
        <h2 className="section-title mb-8 text-center text-2xl sm:text-3xl">منتجات مميزة</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="gold" size="lg" asChild>
            <Link to="/shop" search={{ q: undefined }}>عرض جميع المنتجات</Link>
          </Button>
        </div>
      </section>

      <div className="py-6">
        <TrustStrip />
      </div>
      <WholesaleBanner />
    </>
  );
}
