export interface CartLine {
  id: string;
  qty: number;
}

export const MAX_QTY = 50;

export function clampQty(qty: number) {
  if (!Number.isFinite(qty)) return 1;
  return Math.min(MAX_QTY, Math.max(1, Math.round(qty)));
}

/** Total in SAR, using catalog prices only (never client-sent prices). */
export function cartTotal(lines: CartLine[], priceOf: (id: string) => number | undefined) {
  const total = lines.reduce((sum, line) => {
    const price = priceOf(line.id);
    return price === undefined ? sum : sum + price * clampQty(line.qty);
  }, 0);
  return Math.round(total * 100) / 100;
}

export function formatSAR(amount: number) {
  return `${amount.toFixed(2)} ر.س`;
}

const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

/** Normalises a Saudi mobile number to 05XXXXXXXX, or returns null if invalid. */
export function normalizeSaudiMobile(input: string): string | null {
  const western = input.replace(/[٠-٩]/g, (d) => String(ARABIC_DIGITS.indexOf(d)));
  const digits = western.replace(/[\s\-()]/g, "");
  const match = digits.match(/^(?:\+?966|00966|0)?(5\d{8})$/);
  return match ? `0${match[1]}` : null;
}
