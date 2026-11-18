import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { Loader2, PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { lookupOrder } from "@/lib/orders.functions";
import { formatSAR } from "@/lib/cart-math";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "تتبع طلبك | روعة اللحوم" },
      { name: "description", content: "تابع حالة طلبك من روعة اللحوم باستخدام رقم الطلب ورقم الجوال." },
      { property: "og:title", content: "تتبع طلبك | روعة اللحوم" },
      { property: "og:description", content: "تابع حالة طلب اللحوم الخاص بك." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AccountPage,
});

type Result = Awaited<ReturnType<typeof lookupOrder>>;

function AccountPage() {
  const lookup = useServerFn(lookupOrder);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const orderNumber = String(fd.get("orderNumber") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    if (orderNumber.length < 4 || phone.length < 9) {
      setError("الرجاء إدخال رقم الطلب ورقم الجوال");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      setResult(await lookup({ data: { orderNumber, phone } }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-14">
      <header className="mb-8 text-center">
        <PackageSearch className="mx-auto h-14 w-14 text-gold" strokeWidth={1.5} />
        <h1 className="mt-4 font-display text-3xl font-black">تتبع طلبك</h1>
        <p className="mt-2 text-muted-foreground">أدخل رقم الطلب ورقم الجوال المستخدم عند الطلب.</p>
      </header>
      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="space-y-1.5">
          <Label htmlFor="orderNumber" className="font-bold">رقم الطلب</Label>
          <Input id="orderNumber" name="orderNumber" dir="ltr" maxLength={20} placeholder="RL-12345678" className="text-right" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="font-bold">رقم الجوال</Label>
          <Input id="phone" name="phone" type="tel" dir="ltr" maxLength={20} placeholder="05XXXXXXXX" className="text-right" />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" variant="hero" size="xl" className="w-full" disabled={loading}>
          {loading && <Loader2 className="animate-spin" />} بحث
        </Button>
      </form>

      {result && !result.found && (
        <p className="mt-6 rounded-xl border border-border bg-card p-5 text-center text-muted-foreground">لم نجد طلباً بهذه البيانات. تأكد من رقم الطلب ورقم الجوال.</p>
      )}
      {result && result.found && (
        <div className="mt-6 space-y-3 rounded-2xl border border-gold/40 bg-card p-6">
          <div className="flex items-center justify-between">
            <span className="font-display text-xl font-black text-gold" dir="ltr">{result.orderNumber}</span>
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">{result.status}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {new Date(result.createdAt).toLocaleDateString("ar-SA", { dateStyle: "long" })} · {result.city}
          </p>
          <ul className="space-y-1 text-sm">
            {result.items.map((i) => (
              <li key={i.name} className="flex justify-between"><span>{i.name} ({i.weight})</span><span>× {i.qty}</span></li>
            ))}
          </ul>
          <div className="flex justify-between border-t border-border pt-3 font-extrabold">
            <span>الإجمالي</span><span className="text-gold">{formatSAR(result.total)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
