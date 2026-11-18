import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Award, Menu, Search, ShoppingCart, Snowflake, Truck, User } from "lucide-react";
import { Logo } from "./Logo";
import { useCart } from "@/lib/cart-context";
import { formatSAR } from "@/lib/cart-math";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

export const NAV_ITEMS = [
  { label: "الرئيسية", to: "/" as const },
  { label: "الهدايا", to: "/category/$slug" as const, slug: "gifts" },
  { label: "لحوم الضأن", to: "/category/$slug" as const, slug: "lamb" },
  { label: "لحوم العجل", to: "/category/$slug" as const, slug: "veal" },
  { label: "القطعيات", to: "/category/$slug" as const, slug: "cuts" },
  { label: "نقائق", to: "/category/$slug" as const, slug: "sausages" },
  { label: "العروض الخاصة", to: "/category/$slug" as const, slug: "offers" },
  { label: "اتصل بنا", to: "/contact" as const },
];

function NavLink({ item, onClick, className }: { item: (typeof NAV_ITEMS)[number]; onClick?: () => void; className: string }) {
  const activeProps = { className: "text-gold after:scale-x-100" };
  if ("slug" in item && item.slug) {
    return (
      <Link to="/category/$slug" params={{ slug: item.slug }} onClick={onClick} className={className} activeProps={activeProps}>
        {item.label}
      </Link>
    );
  }
  return (
    <Link to={item.to as "/" | "/contact"} onClick={onClick} className={className} activeProps={activeProps} activeOptions={{ exact: true }}>
      {item.label}
    </Link>
  );
}

export function SiteHeader() {
  const { count, total, setOpen } = useCart();
  const [q, setQ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate({ to: "/shop", search: { q: q.trim() || undefined } });
  };

  return (
    <header className="sticky top-0 z-40">
      {/* Announcement bar */}
      <div className="bg-crimson text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-4 py-2 text-xs sm:justify-between sm:text-sm">
          <span className="flex items-center gap-2"><Truck className="h-4 w-4 shrink-0" /> توصيل مبرد خلال 24 ساعة</span>
          <span className="hidden items-center gap-2 sm:flex"><Award className="h-4 w-4 shrink-0" /> جودة عالية 100%</span>
          <span className="hidden items-center gap-2 md:flex"><Snowflake className="h-4 w-4 shrink-0" /> لحوم طازجة ومبردة يومياً</span>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 lg:flex lg:gap-6">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              aria-label="القائمة"
              onClick={() => setMenuOpen(true)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Logo />
          </div>

          <form onSubmit={onSearch} className="order-last col-span-2 lg:order-none lg:mx-auto lg:w-full lg:max-w-md">
            <label className="flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 text-surface-foreground">
              <Search className="h-4 w-4 shrink-0 opacity-60" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="ابحث عن منتج..."
                aria-label="ابحث عن منتج"
                className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-surface-foreground/50"
              />
            </label>
          </form>

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <Link to="/account" className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-secondary">
              <User className="h-6 w-6 shrink-0" />
              <span className="hidden text-right leading-tight sm:block">
                <span className="block text-sm font-bold">حسابي</span>
                <span className="block text-xs text-muted-foreground">تتبع طلباتك</span>
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-secondary"
              aria-label={`السلة، ${count} منتج`}
            >
              <span className="relative">
                <ShoppingCart className="h-7 w-7" />
                <span className="absolute -top-2 -left-2 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
                  {count}
                </span>
              </span>
              <span className="hidden text-right leading-tight sm:block">
                <span className="block text-sm font-bold">السلة</span>
                <span className="block text-xs text-gold">{formatSAR(total)}</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Category navigation */}
      <nav className="hidden bg-nav lg:block" aria-label="الأقسام">
        <ul className="mx-auto flex max-w-7xl items-center justify-between px-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <NavLink
                item={item}
                className="relative block px-3 py-3.5 text-sm font-bold text-primary-foreground transition-colors hover:text-gold after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:origin-center after:scale-x-0 after:bg-gold after:transition-transform"
              />
            </li>
          ))}
        </ul>
      </nav>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="right" className="w-72 border-border bg-card p-0">
          <SheetTitle className="border-b border-border p-5 pr-12">
            <Logo compact />
          </SheetTitle>
          <ul className="p-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <NavLink
                  item={item}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 font-bold hover:bg-secondary"
                />
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </header>
  );
}
