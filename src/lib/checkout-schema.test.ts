import { describe, expect, it } from "vitest";
import { checkoutSchema, isOnlinePayment } from "./checkout-schema";

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
  it.each(["cod", "card", "tabby", "tamara"])("accepts %s", (m) => {
    expect(checkoutSchema.safeParse({ ...base, paymentMethod: m }).success).toBe(true);
  });
  it("rejects removed gateways", () => {
    expect(checkoutSchema.safeParse({ ...base, paymentMethod: "paymob" }).success).toBe(false);
  });
  it("only cash on delivery is paid at the door", () => {
    expect(isOnlinePayment("cod")).toBe(false);
    expect(isOnlinePayment("tabby")).toBe(true);
    expect(isOnlinePayment("tamara")).toBe(true);
    expect(isOnlinePayment("card")).toBe(true);
  });
});
