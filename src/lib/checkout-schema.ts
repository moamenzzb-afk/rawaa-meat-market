import { z } from "zod";
import { MAX_QTY, normalizeSaudiMobile } from "./cart-math";

export const PAYMENT_METHODS = ["cod", "card", "tabby", "tamara"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  cod: "الدفع عند الاستلام",
  card: "بطاقة مدى / فيزا / ماستركارد",
  tabby: "تابي - قسّمها على 4 دفعات",
  tamara: "تمارا - قسّمها على دفعات",
};

/** Methods paid online: the team sends the customer a secure payment link after the order is placed. */
export function isOnlinePayment(method: PaymentMethod) {
  return method !== "cod";
}

export const SAUDI_CITIES = [
  "الرياض", "جدة", "مكة المكرمة", "المدينة المنورة", "الدمام", "الخبر", "الظهران",
  "الطائف", "تبوك", "بريدة", "أبها", "خميس مشيط", "حائل", "جازان", "نجران", "الأحساء", "ينبع", "القطيف",
];

export const checkoutSchema = z.object({
  customerName: z.string().trim().min(3, "الرجاء إدخال الاسم الكامل").max(100, "الاسم طويل جداً"),
  phone: z
    .string()
    .trim()
    .refine((v) => normalizeSaudiMobile(v) !== null, "رقم جوال سعودي غير صحيح (مثال: 05XXXXXXXX)")
    .transform((v) => normalizeSaudiMobile(v) as string),
  city: z.string().trim().min(2, "الرجاء اختيار المدينة").max(60),
  district: z.string().trim().min(2, "الرجاء إدخال الحي").max(80, "اسم الحي طويل جداً"),
  street: z.string().trim().min(2, "الرجاء إدخال اسم الشارع").max(120, "اسم الشارع طويل جداً"),
  building: z.string().trim().min(1, "الرجاء إدخال رقم المبنى أو الفيلا").max(30),
  notes: z.string().trim().max(500, "الملاحظات طويلة جداً").optional().default(""),
  paymentMethod: z.enum(PAYMENT_METHODS, { message: "الرجاء اختيار طريقة دفع متاحة" }),
  items: z
    .array(z.object({ id: z.string().min(1).max(60), qty: z.number().int().min(1).max(MAX_QTY) }))
    .min(1, "السلة فارغة")
    .max(40),
});

export type CheckoutInput = z.input<typeof checkoutSchema>;
