import { Link } from "@tanstack/react-router";
import bull from "@/assets/bull-logo.svg";
import { SITE } from "@/lib/site";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex min-w-0 shrink-0 items-center gap-2" aria-label={SITE.name}>
      <img src={bull} alt="" width={816} height={816} className="h-11 w-11 shrink-0 object-contain sm:h-14 sm:w-14" />
      <div className="min-w-0 leading-tight">
        <div className="font-display text-xl font-black sm:text-2xl">
          <span className="text-primary-glow">روعة</span> <span>اللحوم</span>
        </div>
        {!compact && <div className="text-[11px] text-gold sm:text-xs">{SITE.tagline}</div>}
      </div>
    </Link>
  );
}
