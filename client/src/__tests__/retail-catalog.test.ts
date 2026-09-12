import { describe, it, expect } from "vitest";
import { PRODUCTS, type ProductItem } from "../pages/Retail";

describe("Cheetah Jewelz Radical Minimal Retail Catalog", () => {
  it("should contain all 5 required pieces (3 Eyewear + 2 High Jewelry)", () => {
    expect(PRODUCTS).toHaveLength(5);
    
    const eyewear = PRODUCTS.filter((p) => p.category === "Eyewear");
    const jewelry = PRODUCTS.filter((p) => p.category === "High Jewelry");
    
    expect(eyewear).toHaveLength(3);
    expect(jewelry).toHaveLength(2);
  });

  it("should have valid product images on bone white", () => {
    PRODUCTS.forEach((product) => {
      expect(product.productImage.startsWith("/manus-storage/")).toBe(true);
      expect(product.productImage).toBeTruthy();
    });
  });

  it("should contain zero em dashes anywhere", () => {
    const emDashRegex = /—/;
    PRODUCTS.forEach((product) => {
      expect(product.name).not.toMatch(emDashRegex);
      expect(product.frame).not.toMatch(emDashRegex);
      expect(product.lens).not.toMatch(emDashRegex);
    });
  });

  it("should feature the complete Double Barrel eyewear series", () => {
    const goldBarrel = PRODUCTS.find((p) => p.id === "barrel-01");
    const gunmetalBarrel = PRODUCTS.find((p) => p.id === "barrel-02");
    const bronzeBarrel = PRODUCTS.find((p) => p.id === "barrel-03");

    expect(goldBarrel).toBeDefined();
    expect(goldBarrel?.frame).toContain("18K Brushed Gold");
    expect(goldBarrel?.price).toBe(15000);
    expect(goldBarrel?.priceDisplay).toBe("AED 15,000");

    expect(gunmetalBarrel).toBeDefined();
    expect(gunmetalBarrel?.frame).toContain("Gunmetal Obsidian");
    expect(gunmetalBarrel?.price).toBe(15000);

    expect(bronzeBarrel).toBeDefined();
    expect(bronzeBarrel?.frame).toContain("Antique Bronze");
    expect(bronzeBarrel?.price).toBe(15000);
  });

  it("should feature the fine jewelry archive (Emerald Signet & Atrium Necklace)", () => {
    const emeraldSignet = PRODUCTS.find((p) => p.id === "emerald-signet");
    const atriumNecklace = PRODUCTS.find((p) => p.id === "atrium-necklace");

    expect(emeraldSignet).toBeDefined();
    expect(emeraldSignet?.name).toBe("The Emerald Signet Ring");
    expect(emeraldSignet?.price).toBe(42000);
    expect(emeraldSignet?.priceDisplay).toBe("AED 42,000");

    expect(atriumNecklace).toBeDefined();
    expect(atriumNecklace?.name).toBe("The Atrium Gold Necklace");
    expect(atriumNecklace?.price).toBe(68000);
    expect(atriumNecklace?.priceDisplay).toBe("AED 68,000");
  });

  it("should filter by category accurately", () => {
    const eyewearOnly = PRODUCTS.filter((p) => p.category === "Eyewear");
    const jewelryOnly = PRODUCTS.filter((p) => p.category === "High Jewelry");

    expect(eyewearOnly).toHaveLength(3);
    expect(jewelryOnly).toHaveLength(2);
  });

  it("should calculate cart prices accurately in AED", () => {
    const items = [
      { product: PRODUCTS[0], qty: 2 }, // 2 * 15,000 = 30,000
      { product: PRODUCTS[3], qty: 1 }, // 1 * 42,000 = 42,000
      { product: PRODUCTS[4], qty: 1 }, // 1 * 68,000 = 68,000
    ];

    const totalQty = items.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

    expect(totalQty).toBe(4);
    expect(totalPrice).toBe(140000);
    expect(`AED ${totalPrice.toLocaleString()}`).toBe("AED 140,000");
  });
});
