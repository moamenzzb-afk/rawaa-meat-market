import wholesale from "@/assets/wholesale-meat.svg";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { whatsappLink } from "@/lib/site";

export function WholesaleBanner() {
  return (
    <section id="wholesale" className="mx-auto max-w-7xl px-4 py-10">
      <div className="relative overflow-hidden rounded-3xl border border-primary/40 shadow-crimson">
        <img src={wholesale} alt="" loading="lazy" width={1600} height={640} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-fade" />
        <div className="relative flex flex-col gap-5 p-8 sm:p-12 md:max-w-xl">
          <span className="w-fit rounded-full border border-gold/50 px-3 py-1 text-xs font-bold text-gold">للمطاعم والفنادق والشركات</span>
          <h2 className="font-display text-2xl font-black leading-snug sm:text-4xl">
            اطلب بالجملة واحصل على <span className="text-primary-glow">أسعار خاصة</span>
          </h2>
          <p className="text-muted-foreground">كميات كبيرة، تقطيع حسب احتياجك، وتوريد منتظم مبرد إلى موقعك.</p>
          <Button variant="whatsapp" size="xl" className="w-fit" asChild>
            <a href={whatsappLink("مرحباً روعة اللحوم، أرغب في طلب بالجملة")} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="!size-5" /> تواصل معنا عبر واتساب
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
