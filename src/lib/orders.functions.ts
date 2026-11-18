import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { checkoutSchema } from "./checkout-schema";
import { getProduct } from "./catalog";
import { cartTotal, normalizeSaudiMobile } from "./cart-math";

export const createOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => checkoutSchema.parse(data))
  .handler(async ({ data }) => {
    const items = data.items
      .map((line) => {
        const p = getProduct(line.id);
        return p ? { id: p.id, name: p.name, weight: p.weight, unit_price: p.price, qty: line.qty } : null;
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    if (items.length === 0) throw new Error("السلة لا تحتوي على منتجات صالحة");

    const total = cartTotal(items, (id) => getProduct(id)?.price);
    const orderNumber = `RL-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 90 + 10)}`;

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("orders").insert({
      order_number: orderNumber,
      customer_name: data.customerName,
      phone: data.phone,
      city: data.city,
      district: data.district,
      street: data.street,
      building: data.building,
      notes: data.notes || null,
      payment_method: data.paymentMethod,
      items,
      total_sar: total,
    });

    if (error) {
      console.error("Order insert failed", error);
      throw new Error("تعذر حفظ الطلب، حاول مرة أخرى");
    }

    return { orderNumber, total };
  });

const STATUS_LABEL: Record<string, string> = {
  new: "تم استلام الطلب",
  preparing: "قيد التجهيز",
  shipped: "في الطريق إليك",
  delivered: "تم التوصيل",
  cancelled: "ملغي",
};

export const lookupOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    return z
      .object({ orderNumber: z.string().trim().min(4).max(20), phone: z.string().trim().min(9).max(20) })
      .parse(data);
  })
  .handler(async ({ data }) => {
    const phone = normalizeSaudiMobile(data.phone);
    if (!phone) return { found: false as const };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("orders")
      .select("order_number, status, total_sar, created_at, items, city")
      .eq("order_number", data.orderNumber.toUpperCase())
      .eq("phone", phone)
      .maybeSingle();
    if (error) {
      console.error("Order lookup failed", error);
      throw new Error("تعذر البحث عن الطلب حالياً");
    }
    if (!row) return { found: false as const };
    const items = (row.items as { name: string; qty: number; weight: string }[]) ?? [];
    return {
      found: true as const,
      orderNumber: row.order_number,
      status: STATUS_LABEL[row.status] ?? row.status,
      total: Number(row.total_sar),
      createdAt: row.created_at,
      city: row.city,
      items: items.map((i) => ({ name: i.name, qty: i.qty, weight: i.weight })),
    };
  });
