import { describe, expect, it } from "vitest";
import { checkoutSchema, isOnlinePayment, ACTIVE_PAYMENT_METHODS } from "./checkout-schema";

const base = {
  customerName: "محمد عبدالله",
  phone: "0551234567",
  city: "الرياض",
  district: "النرجس",
  street: "الأمير سلطان",
  building: "12",
  items: [{ id: "x", qty: 1 }],
};

describe("checkout payment methods", () => {
  it.each(ACTIVE_PAYMENT_METHODS)("accepts active method %s", (m) => {
    expect(checkoutSchema.safeParse({ ...base, paymentMethod: m }).success).toBe(true);
  });
  it("rejects inactive gateways", () => {
    expect(checkoutSchema.safeParse({ ...base, paymentMethod: "mada" }).success).toBe(false);
    expect(checkoutSchema.safeParse({ ...base, paymentMethod: "visa" }).success).toBe(false);
    expect(checkoutSchema.safeParse({ ...base, paymentMethod: "kashier" }).success).toBe(false);
    expect(checkoutSchema.safeParse({ ...base, paymentMethod: "paymob" }).success).toBe(false);
  });
  it("only cash on delivery is paid at the door", () => {
    expect(isOnlinePayment("cod")).toBe(false);
    expect(isOnlinePayment("mada")).toBe(true);
    expect(isOnlinePayment("visa")).toBe(true);
    expect(isOnlinePayment("kashier")).toBe(true);
    expect(isOnlinePayment("paymob")).toBe(true);
  });
});
