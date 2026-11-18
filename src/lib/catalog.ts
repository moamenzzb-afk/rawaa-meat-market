import mincedBeef from "@/assets/p-minced-beef.jpg";
import beefCubes from "@/assets/p-beef-cubes.jpg";
import beefSteak from "@/assets/p-beef-steak.jpg";
import lambRack from "@/assets/p-lamb-rack.jpg";
import beefSausage from "@/assets/p-beef-sausage.jpg";
import lambShoulder from "@/assets/p-lamb-shoulder.jpg";
import beefBurger from "@/assets/p-beef-burger.jpg";
import giftBox from "@/assets/p-gift-box.jpg";

export type CategorySlug = "offers" | "lamb" | "veal" | "cuts" | "sausages" | "gifts";
export type Badge = "new" | "chilled" | "offer";

export interface Product {
  id: string;
  name: string;
  description: string;
  weight: string;
  price: number;
  oldPrice?: number;
  badge: Badge;
  image: string;
  categories: CategorySlug[];
  featured?: boolean;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  blurb: string;
  image?: string;
}

export const CATEGORIES: Category[] = [
  { slug: "offers", name: "العروض الخاصة", blurb: "خصومات تصل حتى 30%" },
  { slug: "lamb", name: "لحوم الضأن", blurb: "طازجة ومبردة يومياً", image: lambRack },
  { slug: "veal", name: "لحوم العجل", blurb: "عجل بلدي طازج", image: beefSteak },
  { slug: "cuts", name: "القطعيات", blurb: "مقطّعة حسب الطلب", image: beefCubes },
  { slug: "sausages", name: "نقائق", blurb: "طازجة بتتبيلة مميزة", image: beefSausage },
  { slug: "gifts", name: "الهدايا", blurb: "صناديق فاخرة للمناسبات", image: giftBox },
];

export const BADGE_LABEL: Record<Badge, string> = {
  new: "جديد",
  chilled: "مبرد",
  offer: "عرض خاص",
};

export const PRODUCTS: Product[] = [
  { id: "veal-mince", name: "مفروم عجل بلدي", description: "مفروم طازج يومياً من لحم عجل بلدي", weight: "1 كيلو", price: 44, oldPrice: 56, badge: "offer", image: mincedBeef, categories: ["veal", "offers"], featured: true },
  { id: "veal-cubes", name: "قطع عجل مكعبات", description: "مكعبات مثالية للطبخ والمرق", weight: "1 كيلو", price: 64, badge: "chilled", image: beefCubes, categories: ["veal", "cuts"], featured: true },
  { id: "veal-steak", name: "ستيك عجل بلدي", description: "ستيك سميك بتعريق مثالي للشوي", weight: "1 كيلو", price: 79, badge: "chilled", image: beefSteak, categories: ["veal", "cuts"], featured: true },
  { id: "lamb-ribs", name: "ريش ضان فاخر", description: "ريش ضان طرية بعظم منظّف", weight: "1 كيلو", price: 69, badge: "chilled", image: lambRack, categories: ["lamb", "cuts"], featured: true },
  { id: "beef-sausage", name: "نقائق بقري", description: "نقائق طازجة بتتبيلة روعة الخاصة", weight: "500 جرام", price: 22, badge: "new", image: beefSausage, categories: ["sausages"], featured: true },
  { id: "lamb-shoulder", name: "كتف ضان طازج", description: "كتف ضان كامل بالعظم", weight: "1 كيلو", price: 58, badge: "new", image: lambShoulder, categories: ["lamb"] },
  { id: "beef-burger", name: "برجر بقري طازج", description: "4 أقراص برجر من لحم بقري صافٍ", weight: "500 جرام", price: 29, oldPrice: 35, badge: "offer", image: beefBurger, categories: ["veal", "offers"] },
  { id: "lamb-mince", name: "مفروم ضان", description: "مفروم ضان طازج للكباب والكفتة", weight: "500 جرام", price: 36, badge: "chilled", image: mincedBeef, categories: ["lamb"] },
  { id: "gift-box", name: "صندوق روعة الفاخر", description: "ستيك وريش ضان ونقائق في صندوق هدية", weight: "3 كيلو", price: 299, badge: "new", image: giftBox, categories: ["gifts", "offers"] },
];

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function productsInCategory(slug: CategorySlug) {
  return PRODUCTS.filter((p) => p.categories.includes(slug));
}
