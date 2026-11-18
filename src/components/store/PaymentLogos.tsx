import { Banknote } from "lucide-react";
import { cn } from "@/lib/utils";

/** Small brand chips for payment methods. Wordmarks are drawn in code so they stay crisp at any size. */
const chip = "inline-flex h-8 items-center justify-center rounded-md px-2.5 shadow-sm";

export function TabbyLogo({ className }: { className?: string }) {
  return (
    <span className={cn(chip, "bg-tabby text-tabby-foreground", className)} aria-label="تابي Tabby" role="img">
      <span dir="ltr" className="font-sans text-[15px] font-black lowercase tracking-tight">tabby</span>
    </span>
  );
}

export function TamaraLogo({ className }: { className?: string }) {
  return (
    <span className={cn(chip, "bg-tamara text-tamara-foreground", className)} aria-label="تمارا Tamara" role="img">
      <span dir="ltr" className="font-sans text-[15px] font-extrabold lowercase tracking-tight">tamara</span>
    </span>
  );
}

export function MadaLogo({ className }: { className?: string }) {
  return (
    <span className={cn(chip, "gap-1.5 bg-logo-chip", className)} aria-label="مدى mada" role="img">
      <span className="flex flex-col gap-[3px]" aria-hidden="true">
        <span className="block h-[5px] w-6 rounded-sm bg-mada-blue" />
        <span className="block h-[5px] w-6 rounded-sm bg-mada-green" />
      </span>
      <span dir="ltr" className="font-sans text-[14px] font-black lowercase text-mada-blue">mada</span>
    </span>
  );
}

export function VisaLogo({ className }: { className?: string }) {
  return (
    <span className={cn(chip, "bg-logo-chip", className)} aria-label="فيزا Visa" role="img">
      <span dir="ltr" className="font-sans text-[16px] font-black italic tracking-tight text-visa">VISA</span>
    </span>
  );
}

export function MastercardLogo({ className }: { className?: string }) {
  return (
    <span className={cn(chip, "bg-logo-chip", className)} aria-label="ماستركارد Mastercard" role="img">
      <svg viewBox="0 0 38 24" className="h-5 w-8" aria-hidden="true">
        <circle cx="14" cy="12" r="9" className="fill-mc-red" />
        <circle cx="24" cy="12" r="9" className="fill-mc-orange" fillOpacity="0.9" />
      </svg>
    </span>
  );
}

export function CashLogo({ className }: { className?: string }) {
  return (
    <span className={cn(chip, "gap-1.5 border border-gold/50 bg-secondary text-gold", className)} aria-label="الدفع نقداً" role="img">
      <Banknote className="h-4 w-4" />
      <span className="text-[13px] font-bold">كاش</span>
    </span>
  );
}

export function PaymentLogoRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <TabbyLogo />
      <TamaraLogo />
      <MadaLogo />
      <VisaLogo />
      <MastercardLogo />
      <CashLogo />
    </div>
  );
}
