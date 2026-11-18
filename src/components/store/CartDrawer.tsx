import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { getProduct } from "@/lib/catalog";
import { formatSAR } from "@/lib/cart-math";

export function QtyStepper({ id, qty }: { id: string; qty: number }) {
  const { setQty } = useCart();
  return (
    <div className="flex items-center rounded-lg border border-border">
      <button type="button" aria-label="زيادة الكمية" onClick={() => setQty(id, qty + 1)} className="grid h-8 w-8 place-items-center hover:text-primary-glow">
        <Plus className="h-4 w-4" />
      </button>
      <span className="w-8 text-center text-sm font-bold tabular-nums">{qty}</span>
      <button type="button" aria-label="تقليل الكمية" onClick={() => setQty(id, qty - 1)} className="grid h-8 w-8 place-items-center hover:text-primary-glow">
        <Minus className="h-4 w-4" />
      </button>
    </div>
  );
}

export function CartDrawer() {
  const { lines, isOpen, setOpen, total, remove, count } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="left" className="flex w-full flex-col border-border bg-card p-0 sm:max-w-md">
        <div className="border-b border-border p-5 pr-12">
          <SheetTitle className="font-display text-xl font-extrabold">سلة المشتريات</SheetTitle>
          <SheetDescription className="text-muted-foreground">{count} منتج في السلة</SheetDescription>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <ShoppingBag className="h-14 w-14 text-muted-foreground" />
            <p className="text-muted-foreground">سلتك فارغة حالياً</p>
            <Button variant="hero" onClick={() => setOpen(false)} asChild>
              <Link to="/shop" search={{ q: undefined }}>تسوق الآن</Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {lines.map((line) => {
                const p = getProduct(line.id);
                if (!p) return null;
                return (
                  <li key={line.id} className="flex gap-3 py-4">
                    <img src={p.image} alt={p.name} loading="lazy" width={896} height={752} className="h-20 w-20 shrink-0 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-bold">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.weight}</p>
                        </div>
                        <button type="button" aria-label={`حذف ${p.name}`} onClick={() => remove(line.id)} className="shrink-0 text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <QtyStepper id={line.id} qty={line.qty} />
                        <span className="font-bold text-gold tabular-nums">{formatSAR(p.price * line.qty)}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="space-y-3 border-t border-border p-5">
              <div className="flex items-center justify-between text-lg font-extrabold">
                <span>الإجمالي</span>
                <span className="text-gold tabular-nums">{formatSAR(total)}</span>
              </div>
              <p className="text-xs text-muted-foreground">الأسعار شاملة ضريبة القيمة المضافة</p>
              <Button variant="hero" size="xl" className="w-full" asChild onClick={() => setOpen(false)}>
                <Link to="/checkout">إتمام الطلب</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
