import {
  applyMovement,
  computeCartTotal,
  normalizeScannedCode,
  validateNoNegativeStock
} from "../domain";

describe("normalizeScannedCode", () => {
  test("extracts token from URL path", () => {
    expect(normalizeScannedCode("https://example.com/c/abc123")).toBe("abc123");
  });

  test("extracts token from relative path with query", () => {
    expect(normalizeScannedCode("/c/token-1?x=1#hash")).toBe("token-1");
  });

  test("normalizes numeric barcode with spaces and hyphens", () => {
    expect(normalizeScannedCode("  0123-456  ")).toBe("0123456");
  });

  test("passes through plain token", () => {
    expect(normalizeScannedCode("tok_ABC")).toBe("tok_ABC");
  });

  test("returns null for empty input", () => {
    expect(normalizeScannedCode("   ")).toBeNull();
  });

  test("returns null for URL without /c/", () => {
    expect(normalizeScannedCode("https://example.com/product/abc"))
      .toBeNull();
  });

  test("returns null for token with spaces", () => {
    expect(normalizeScannedCode("abc 123")).toBeNull();
  });
});

describe("computeCartTotal", () => {
  test("sums items", () => {
    const total = computeCartTotal([
      { qty: 2, unitPrice: 100 },
      { qty: 1, unitPrice: 50 }
    ]);

    expect(total).toBe(250);
  });

  test("returns 0 for empty array", () => {
    expect(computeCartTotal([])).toBe(0);
  });

  test("throws on negative qty", () => {
    expect(() => computeCartTotal([{ qty: -1, unitPrice: 100 }])).toThrow();
  });

  test("throws on negative unitPrice", () => {
    expect(() => computeCartTotal([{ qty: 1, unitPrice: -100 }])).toThrow();
  });

  test("throws on non-finite qty", () => {
    expect(() => computeCartTotal([{ qty: Number.NaN, unitPrice: 100 }]))
      .toThrow();
  });
});

describe("validateNoNegativeStock", () => {
  test("returns true when stock covers sale", () => {
    expect(validateNoNegativeStock(10, 3)).toBe(true);
  });

  test("returns false when sale exceeds stock", () => {
    expect(validateNoNegativeStock(5, 6)).toBe(false);
  });

  test("returns false for negative values", () => {
    expect(validateNoNegativeStock(-1, 1)).toBe(false);
    expect(validateNoNegativeStock(1, -1)).toBe(false);
  });

  test("returns false for non-finite values", () => {
    expect(validateNoNegativeStock(Number.NaN, 1)).toBe(false);
  });
});

describe("applyMovement", () => {
  test("adds quantity for IN", () => {
    expect(applyMovement(10, { type: "IN", qty: 5 })).toBe(15);
  });

  test("subtracts quantity for SALE", () => {
    expect(applyMovement(10, { type: "SALE", qty: 3 })).toBe(7);
  });

  test("adjusts quantity for ADJUST", () => {
    expect(applyMovement(10, { type: "ADJUST", qty: -4 })).toBe(6);
  });

  test("throws when SALE would go negative", () => {
    expect(() => applyMovement(2, { type: "SALE", qty: 3 })).toThrow();
  });

  test("throws when IN qty is negative", () => {
    expect(() => applyMovement(2, { type: "IN", qty: -1 })).toThrow();
  });

  test("throws on unsupported movement type", () => {
    expect(() => applyMovement(2, { type: "MOVE" as any, qty: 1 })).toThrow();
  });
});
