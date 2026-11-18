// Contact details shown across the store. Placeholder number until the owner provides theirs.
export const SITE = {
  name: "روعة اللحوم",
  tagline: "جودة تستحق الثقة",
  whatsappNumber: "966500000000",
  supportPhoneDisplay: "050 000 0000",
  supportPhoneHref: "tel:+966500000000",
  email: "care@roatalluhum.sa",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
