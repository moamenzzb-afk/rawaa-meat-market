import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { CheckCircle2, CreditCard, Loader2, Lock, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QtyStepper } from "@/components/store/CartDrawer";
import { useCart } from "@/lib/cart-context";
import { getProduct } from "@/lib/catalog";
import { formatSAR } from "@/lib/cart-math";
import { ACTIVE_PAYMENT_METHODS, SAUDI_CITIES, checkoutSchema, type PaymentMethod } from "@/lib/checkout-schema";
import { createOrder } from "@/lib/orders.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "إتمام الطلب | روعة اللحوم" },
      { name: "description", content: "أكمل طلبك من روعة اللحوم وأدخل عنوان التوصيل داخل المملكة العربية السعودية." },
      { property: "og:title", content: "إتمام الطلب | روعة اللحوم" },
      { property: "og:description", content: "أدخل بيانات التوصيل وأكمل طلب اللحوم الطازجة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string; note: string; icon: typeof Wallet }[] = [
  { id: "cod", label: "الدفع عند الاستلام", note: "نقداً أو بالشبكة عند وصول الطلب", icon: Wallet },
  { id: "mada", label: "مدى", note: "قريباً", icon: CreditCard },
  { id: "visa", label: "فيزا / ماستركارد", note: "قريباً", icon: CreditCard },
  { id: "kashier", label: "Kashier", note: "بوابة دفع إلكتروني - قريباً", icon: Lock },
  { id: "paymob", label: "Paymob", note: "بوابة دفع إلكتروني - قريباً", icon: Lock },
];

type FieldKey = "customerName" | "phone" | "city" | "district" | "street" | "building" | "notes" | "paymentMethod" | "items";
type FieldErrors = { [K in FieldKey]?: string | undefined };

function Field({ id, label, error, children }: { id: string; label: string; error?: string | undefined; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="font-bold">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function CheckoutPage() {
  const { lines, total, clear } = useCart();
  const submit = useServerFn(createOrder);
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [done, setDone] = useState<{ orderNumber: string; total: number } | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      customerName: String(fd.get("customerName") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      city: String(fd.get("city") ?? ""),
      district: String(fd.get("district") ?? ""),
      street: String(fd.get("street") ?? ""),
      building: String(fd.get("building") ?? ""),
      notes: String(fd.get("notes") ?? ""),
      paymentMethod: payment,
      items: lines,
    };
    const parsed = checkoutSchema.safeParse(payload);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]) as FieldKey;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const res = await submit({ data: payload });
      setDone(res);
      clear();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "حدث خطأ، حاول مرة أخرى");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <CheckCircle2 className="mx-auto h-20 w-20 text-whatsapp" strokeWidth={1.5} />
        <h1 className="mt-6 font-display text-3xl font-black">تم استلام طلبك بنجاح</h1>
        <p className="mt-3 text-muted-foreground">سيتواصل معك فريقنا قريباً لتأكيد موعد التوصيل.</p>
        <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-gold/40 bg-card p-6">
          <p className="text-sm text-muted-foreground">رقم الطلب</p>
          <p className="mt-1 font-display text-2xl font-black text-gold" dir="ltr">{done.orderNumber}</p>
          <p className="mt-4 text-sm text-muted-foreground">الإجمالي</p>
          <p className="mt-1 text-xl font-extrabold">{formatSAR(done.total)}</p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button variant="hero" asChild><Link to="/">العودة للرئيسية</Link></Button>
          <Button variant="gold" asChild><Link to="/account">تتبع الطلب</Link></Button>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-black">سلتك فارغة</h1>
        <p className="mt-3 text-muted-foreground">أضف بعض المنتجات قبل إتمام الطلب.</p>
        <Button variant="hero" size="xl" className="mt-8" asChild>
          <Link to="/shop" search={{ q: undefined }}>تسوق الآن</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="section-title mb-10 text-center text-3xl sm:text-4xl">إتمام الطلب</h1>
      <form onSubmit={onSubmit} noValidate className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div className="space-y-8">
          <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="mb-5 text-xl font-extrabold">بيانات التوصيل</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="customerName" label="الاسم الكامل" error={errors.customerName}>
                <Input id="customerName" name="customerName" autoComplete="name" maxLength={100} placeholder="مثال: محمد عبدالله" />
              </Field>
              <Field id="phone" label="رقم الجوال" error={errors.phone}>
                <Input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" maxLength={20} placeholder="05XXXXXXXX" className="text-right" />
              </Field>
              <Field id="city" label="المدينة" error={errors.city}>
                <select id="city" name="city" defaultValue="" className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <option value="" disabled className="bg-card">اختر المدينة</option>
                  {SAUDI_CITIES.map((c) => (
                    <option key={c} value={c} className="bg-card">{c}</option>
                  ))}
                </select>
              </Field>
              <Field id="district" label="الحي" error={errors.district}>
                <Input id="district" name="district" maxLength={80} placeholder="مثال: حي النرجس" />
              </Field>
              <Field id="street" label="اسم الشارع" error={errors.street}>
                <Input id="street" name="street" maxLength={120} placeholder="مثال: شارع الأمير سلطان" />
              </Field>
              <Field id="building" label="رقم المبنى / الفيلا" error={errors.building}>
                <Input id="building" name="building" maxLength={30} placeholder="مثال: فيلا 12" />
              </Field>
              <div className="sm:col-span-2">
                <Field id="notes" label="ملاحظات التوصيل (اختياري)" error={errors.notes}>
                  <Textarea id="notes" name="notes" maxLength={500} rows={3} placeholder="مثال: الرجاء الاتصال قبل الوصول، أو طريقة التقطيع المفضلة" />
                </Field>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="mb-5 text-xl font-extrabold">طريقة الدفع</h2>
            <div role="radiogroup" aria-label="طريقة الدفع" className="grid gap-3 sm:grid-cols-2">
              {PAYMENT_OPTIONS.map(({ id, label, note, icon: Icon }) => {
                const enabled = ACTIVE_PAYMENT_METHODS.includes(id);
                const selected = payment === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    disabled={!enabled}
                    onClick={() => setPayment(id)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border p-4 text-right transition-colors",
                      selected ? "border-primary bg-accent" : "border-border",
                      enabled ? "hover:border-primary/60" : "cursor-not-allowed opacity-50",
                    )}
                  >
                    <Icon className="h-6 w-6 shrink-0 text-gold" />
                    <span className="min-w-0">
                      <span className="block font-bold">{label}</span>
                      <span className="block text-xs text-muted-foreground">{note}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            {errors.paymentMethod && <p className="mt-2 text-xs text-destructive">{errors.paymentMethod}</p>}
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-card lg:sticky lg:top-44">
          <h2 className="mb-4 text-xl font-extrabold">ملخص الطلب</h2>
          <ul className="divide-y divide-border">
            {lines.map((line) => {
              const p = getProduct(line.id);
              if (!p) return null;
              return (
                <li key={line.id} className="flex items-center gap-3 py-3">
                  <img src={p.image} alt={p.name} loading="lazy" width={896} height={752} className="h-14 w-14 shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.weight} · {formatSAR(p.price)}</p>
                  </div>
                  <QtyStepper id={line.id} qty={line.qty} />
                </li>
              );
            })}
          </ul>
          <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">المجموع</span><span className="tabular-nums">{formatSAR(total)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">التوصيل</span><span>يُحدد عند التأكيد</span></div>
            <div className="flex justify-between pt-2 text-lg font-extrabold"><span>الإجمالي</span><span className="text-gold tabular-nums">{formatSAR(total)}</span></div>
          </div>
          {serverError && <p className="mt-4 rounded-lg bg-destructive/15 p-3 text-sm text-destructive">{serverError}</p>}
          <Button type="submit" variant="hero" size="xl" className="mt-6 w-full" disabled={submitting}>
            {submitting ? <Loader2 className="animate-spin" /> : <Lock />} تأكيد الطلب
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">بياناتك محمية ولن تتم مشاركتها</p>
        </aside>
      </form>
    </div>
  );
}
