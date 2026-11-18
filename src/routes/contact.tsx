import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/store/WhatsAppIcon";
import { WholesaleBanner } from "@/components/store/WholesaleBanner";
import { SITE, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "اتصل بنا | روعة اللحوم" },
      { name: "description", content: "تواصل مع فريق روعة اللحوم عبر الهاتف أو واتساب، خدمة عملاء متاحة 24/7." },
      { property: "og:title", content: "اتصل بنا | روعة اللحوم" },
      { property: "og:description", content: "خدمة عملاء روعة اللحوم متاحة 24/7 عبر الهاتف وواتساب." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <div className="mx-auto max-w-5xl px-4 py-12">
        <header className="mb-10 text-center">
          <h1 className="section-title text-3xl sm:text-4xl">اتصل بنا</h1>
          <p className="mt-3 text-muted-foreground">فريقنا جاهز لمساعدتك في طلبك أو استفسارك على مدار الساعة.</p>
        </header>
        <div className="grid gap-4 md:grid-cols-3">
          <a href={SITE.supportPhoneHref} className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-8 text-center shadow-card hover:border-primary/60">
            <Phone className="h-10 w-10 text-primary-glow" strokeWidth={1.5} />
            <h2 className="text-lg font-extrabold">الدعم الفني</h2>
            <span className="text-xl font-black" dir="ltr">{SITE.supportPhoneDisplay}</span>
          </a>
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-8 text-center shadow-card">
            <WhatsAppIcon className="h-10 w-10 text-whatsapp" />
            <h2 className="text-lg font-extrabold">واتساب</h2>
            <Button variant="whatsapp" asChild>
              <a href={whatsappLink("مرحباً روعة اللحوم")} target="_blank" rel="noopener noreferrer">ابدأ المحادثة</a>
            </Button>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-8 text-center shadow-card">
            <Mail className="h-10 w-10 text-gold" strokeWidth={1.5} />
            <h2 className="text-lg font-extrabold">البريد الإلكتروني</h2>
            <span className="text-muted-foreground">{SITE.email}</span>
          </div>
        </div>
        <p className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" /> خدمة العملاء متاحة 24/7
        </p>
      </div>
      <WholesaleBanner />
    </>
  );
}
