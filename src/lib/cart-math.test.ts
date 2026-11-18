import { describe, expect, it } from "vitest";
import { cartTotal, normalizeSaudiMobile } from "./cart-math";

const prices: Record<string, number> = { a: 44, b: 22.5 };

describe("cart total in SAR", () => {
  it("multiplies catalog price by quantity and sums lines", () => {
    expect(cartTotal([{ id: "a", qty: 2 }, { id: "b", qty: 1 }], (id) => prices[id])).toBe(110.5);
  });
  it("ignores unknown products", () => {
    expect(cartTotal([{ id: "zzz", qty: 3 }, { id: "a", qty: 1 }], (id) => prices[id])).toBe(44);
  });
});

describe("Saudi mobile number", () => {
  it("accepts 05 numbers", () => expect(normalizeSaudiMobile("0551234567")).toBe("0551234567"));
  it("accepts +966 format", () => expect(normalizeSaudiMobile("+966 55 123 4567")).toBe("0551234567"));
  it("accepts Arabic digits", () => expect(normalizeSaudiMobile("٠٥٥١٢٣٤٥٦٧")).toBe("0551234567"));
  it("rejects landlines and short numbers", () => {
    expect(normalizeSaudiMobile("0112345678")).toBeNull();
    expect(normalizeSaudiMobile("05512345")).toBeNull();
  });
});
