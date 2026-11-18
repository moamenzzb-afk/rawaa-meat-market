const mincedBeef = "https://images.unsplash.com/photo-1612078894671-f11ba41d713e?w=800&auto=format&fit=crop&q=80";
const beefCubes = "https://images.unsplash.com/photo-1690983325563-fe4412c4c347?w=800&auto=format&fit=crop&q=80";
const beefSteak = "https://images.unsplash.com/photo-1723893905879-0e309c2a8e06?w=800&auto=format&fit=crop&q=80";
const lambRack = "https://plus.unsplash.com/premium_photo-1668616817170-2a74b5cd181d?w=800&auto=format&fit=crop&q=80";
const beefSausage = "https://images.unsplash.com/photo-1771243108040-696d2544adf3?w=800&auto=format&fit=crop&q=80";
const lambShoulder = "https://images.unsplash.com/photo-1662979516518-7465baa46814?w=800&auto=format&fit=crop&q=80";
const beefBurger = "https://plus.unsplash.com/premium_photo-1712063188469-af8a04504dcd?w=800&auto=format&fit=crop&q=80";
const giftBox = "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&auto=format&fit=crop&q=80";

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
