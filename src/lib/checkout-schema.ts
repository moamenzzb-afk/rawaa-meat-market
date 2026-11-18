import { z } from "zod";
import { MAX_QTY, normalizeSaudiMobile } from "./cart-math";

export const PAYMENT_METHODS = ["cod", "mada", "visa", "kashier", "paymob"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];
/** Online gateways are shown but not yet active. */
export const ACTIVE_PAYMENT_METHODS: PaymentMethod[] = ["cod"];

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
  paymentMethod: z.enum(PAYMENT_METHODS).refine((m) => ACTIVE_PAYMENT_METHODS.includes(m), "طريقة الدفع هذه غير متاحة بعد"),
  items: z
    .array(z.object({ id: z.string().min(1).max(60), qty: z.number().int().min(1).max(MAX_QTY) }))
    .min(1, "السلة فارغة")
    .max(40),
});

export type CheckoutInput = z.input<typeof checkoutSchema>;
