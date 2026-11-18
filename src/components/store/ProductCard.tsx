import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BADGE_LABEL, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart-context";
import { formatSAR } from "@/lib/cart-math";
import { cn } from "@/lib/utils";

const badgeStyle = {
  new: "bg-primary text-primary-foreground",
  chilled: "bg-surface text-surface-foreground",
  offer: "bg-gold text-gold-foreground",
} as const;

export function ProductCard({ product }: { product: Product }) {
  const { add, setOpen } = useCart();

  const onAdd = () => {
    add(product.id);
    toast.success(`تمت إضافة ${product.name} إلى السلة`, {
      action: { label: "عرض السلة", onClick: () => setOpen(true) },
    });
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:border-primary/60">
      <div className="relative aspect-[6/5] overflow-hidden bg-surface">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={896}
          height={752}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className={cn("absolute top-3 right-3 rounded-md px-2.5 py-1 text-xs font-bold", badgeStyle[product.badge])}>
          {BADGE_LABEL[product.badge]}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4 text-center">
        <h3 className="font-display text-base font-bold sm:text-lg">{product.name}</h3>
        <p className="text-xs text-muted-foreground">{product.weight}</p>
        <div className="mt-1 flex items-baseline justify-center gap-2">
          <span className="text-lg font-extrabold text-gold tabular-nums">{formatSAR(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through tabular-nums">{formatSAR(product.oldPrice)}</span>
          )}
        </div>
        <Button variant="hero" className="mt-3 w-full" onClick={onAdd}>
          <ShoppingCart /> أضف للسلة
        </Button>
      </div>
    </article>
  );
}
