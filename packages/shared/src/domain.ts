export type CartItem = {
  qty: number;
  unitPrice: number;
};

export type StockMovementType = "IN" | "ADJUST" | "SALE";

export type StockMovement = {
  type: StockMovementType;
  qty: number;
};

const codePathRegex = /(?:^|\/)c\/([^/?#]+)/i;

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function decodeToken(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function normalizeScannedCode(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const match = trimmed.match(codePathRegex);
  if (match?.[1]) {
    const token = decodeToken(match[1]);
    if (token && !/\s/.test(token)) return token;
  }

  const digits = trimmed.replace(/[\s-]/g, "");
  if (digits && /^\d+$/.test(digits)) {
    return digits;
  }

  if (/\s/.test(trimmed)) return null;
  return trimmed;
}

export function computeCartTotal(items: CartItem[]): number {
  if (!Array.isArray(items)) {
    throw new Error("items must be an array");
  }

  return items.reduce((sum, item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(`item at index ${index} is invalid`);
    }
    const qty = (item as CartItem).qty;
    const unitPrice = (item as CartItem).unitPrice;

    if (!isFiniteNumber(qty) || qty < 0) {
      throw new Error("qty must be a non-negative finite number");
    }
    if (!isFiniteNumber(unitPrice) || unitPrice < 0) {
      throw new Error("unitPrice must be a non-negative finite number");
    }

    return sum + qty * unitPrice;
  }, 0);
}

export function validateNoNegativeStock(onHand: number, saleQty: number): boolean {
  if (!isFiniteNumber(onHand) || !isFiniteNumber(saleQty)) return false;
  if (onHand < 0 || saleQty < 0) return false;
  return onHand - saleQty >= 0;
}

export function applyMovement(onHand: number, movement: StockMovement): number {
  if (!isFiniteNumber(onHand) || onHand < 0) {
    throw new Error("onHand must be a non-negative finite number");
  }
  if (!movement || typeof movement !== "object") {
    throw new Error("movement is required");
  }

  const qty = (movement as StockMovement).qty;
  if (!isFiniteNumber(qty)) {
    throw new Error("qty must be a finite number");
  }

  let nextOnHand = onHand;

  switch (movement.type) {
    case "IN":
      if (qty < 0) throw new Error("IN movement qty must be non-negative");
      nextOnHand = onHand + qty;
      break;
    case "SALE":
      if (qty < 0) throw new Error("SALE movement qty must be non-negative");
      nextOnHand = onHand - qty;
      break;
    case "ADJUST":
      nextOnHand = onHand + qty;
      break;
    default:
      throw new Error(`Unsupported movement type: ${(movement as StockMovement).type}`);
  }

  if (nextOnHand < 0) {
    throw new Error("movement would result in negative stock");
  }

  return nextOnHand;
}
