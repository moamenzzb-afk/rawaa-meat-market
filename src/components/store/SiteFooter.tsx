import { Link } from "@tanstack/react-router";
import { CreditCard, Headphones, Mail, Phone, ShieldCheck, Truck } from "lucide-react";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { SITE, whatsappLink } from "@/lib/site";
import { CATEGORIES } from "@/lib/catalog";

const HIGHLIGHTS = [
  { icon: Truck, title: "توصيل مبرد وأمين", text: "إلى جميع مناطق المملكة" },
  { icon: CreditCard, title: "دفع آمن", text: "مدى، فيزا وخيارات متعددة" },
  { icon: ShieldCheck, title: "جودة مضمونة", text: "لحوم طازجة بفحص صحي معتمد" },
  { icon: Headphones, title: "خدمة عملاء مميزة", text: "نحن هنا لخدمتك 24/7" },
];

export function TrustStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
        {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-center gap-3 bg-card p-4 sm:p-5">
            <Icon className="h-9 w-9 shrink-0 text-primary-glow" strokeWidth={1.5} />
            <div className="min-w-0">
              <p className="font-bold">{title}</p>
              <p className="text-xs text-muted-foreground">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="gold-line" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm leading-relaxed text-muted-foreground">
            متجر لحوم فاخر في المملكة العربية السعودية، نقدم لحوم الضأن والعجل الطازجة مقطعة حسب طلبك وتصلك مبردة حتى باب بيتك.
          </p>
        </div>
        <div>
          <h3 className="mb-4 font-bold text-gold">الأقسام</h3>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link to="/category/$slug" params={{ slug: c.slug }} className="text-muted-foreground hover:text-foreground">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-bold text-gold">روابط سريعة</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" search={{ q: undefined }} className="text-muted-foreground hover:text-foreground">جميع المنتجات</Link></li>
            <li><Link to="/checkout" className="text-muted-foreground hover:text-foreground">إتمام الطلب</Link></li>
            <li><Link to="/account" className="text-muted-foreground hover:text-foreground">تتبع الطلب</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">اتصل بنا</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-bold text-gold">الدعم الفني</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={SITE.supportPhoneHref} className="flex items-center gap-2 text-lg font-extrabold" dir="ltr">
                <Phone className="h-5 w-5 text-primary-glow" /> {SITE.supportPhoneDisplay}
              </a>
            </li>
            <li>
              <a href={whatsappLink("مرحباً روعة اللحوم")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <WhatsAppIcon className="h-5 w-5 text-whatsapp" /> واتساب
              </a>
            </li>
            <li className="flex items-center gap-2 text-muted-foreground"><Mail className="h-5 w-5" /> {SITE.email}</li>
            <li className="text-xs text-muted-foreground">خدمة العملاء متاحة 24/7</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {SITE.name}. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
