// Contact details shown across the store.
export const SITE = {
  name: "روعة اللحوم",
  tagline: "جودة تستحق الثقة",
  whatsappNumber: "966595928960",
  supportPhoneDisplay: "059 592 8960",
  supportPhoneHref: "tel:+966595928960",
  email: "care@roatalluhum.sa",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
