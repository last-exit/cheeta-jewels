import { describe, it, expect } from "vitest";
import { COLLECTIONS, COLLECTION_ORDER } from "../data/collections";

describe("ICON LIVIN Dedicated Collections Specification", () => {
  it("should contain exactly the 4 required collections with exact IDs", () => {
    expect(COLLECTION_ORDER).toEqual(["maharaja", "masquerade", "savanah", "barrel"]);
    expect(Object.keys(COLLECTIONS)).toHaveLength(4);
    
    // Explicit check on exact spelling "SAVANAH"
    expect(COLLECTIONS.savanah).toBeDefined();
    expect(COLLECTIONS.savanah.id).toBe("savanah");
    expect(COLLECTIONS.savanah.title).toBe("SAVANAH");
  });

  it("should strictly alternate two light and two dark palettes", () => {
    expect(COLLECTIONS.maharaja.theme.isDark).toBe(false);
    expect(COLLECTIONS.maharaja.theme.bg).toBe("#E7DCC7");
    expect(COLLECTIONS.maharaja.theme.ink).toBe("#241708");

    expect(COLLECTIONS.masquerade.theme.isDark).toBe(true);
    expect(COLLECTIONS.masquerade.theme.bg).toBe("#120E11");
    expect(COLLECTIONS.masquerade.theme.ink).toBe("#EDE2E2");

    expect(COLLECTIONS.savanah.theme.isDark).toBe(false);
    expect(COLLECTIONS.savanah.theme.bg).toBe("#E4D9BF");
    expect(COLLECTIONS.savanah.theme.ink).toBe("#2C2413");

    expect(COLLECTIONS.barrel.theme.isDark).toBe(true);
    expect(COLLECTIONS.barrel.theme.bg).toBe("#17110C");
    expect(COLLECTIONS.barrel.theme.ink).toBe("#E9DCC6");
  });

  it("should enforce 40-55 word all-caps intro paragraphs", () => {
    COLLECTION_ORDER.forEach((id) => {
      const col = COLLECTIONS[id];
      const words = col.intro.trim().split(/\s+/);
      
      expect(words.length).toBeGreaterThanOrEqual(40);
      expect(words.length).toBeLessThanOrEqual(55);
      expect(col.intro).toBe(col.intro.toUpperCase());
    });
  });

  it("should form an unbroken 4-collection loop in nextId sequence", () => {
    expect(COLLECTIONS.maharaja.nextId).toBe("masquerade");
    expect(COLLECTIONS.masquerade.nextId).toBe("savanah");
    expect(COLLECTIONS.savanah.nextId).toBe("barrel");
    expect(COLLECTIONS.barrel.nextId).toBe("maharaja");
  });

  it("should provide 4 honest products per collection with materials and prices", () => {
    COLLECTION_ORDER.forEach((id) => {
      const col = COLLECTIONS[id];
      expect(col.products).toHaveLength(4);

      col.products.forEach((product) => {
        expect(product.id).toBeTruthy();
        expect(product.name).toBeTruthy();
        expect(product.material).toBeTruthy();
        expect(product.price).toBeGreaterThan(0);
        expect(product.priceDisplay).toMatch(/^AED\s[\d,]+$/);
        expect(product.quad).toBeTruthy();
      });
    });
  });

  it("should include 4 editorial stills, 4 chapters, and credits for each collection", () => {
    COLLECTION_ORDER.forEach((id) => {
      const col = COLLECTIONS[id];
      expect(col.stills).toHaveLength(4);
      expect(col.chapters).toHaveLength(4);
      expect(col.credits.length).toBeGreaterThanOrEqual(4);
      expect(col.video).toMatch(/^\/videos\/.+\.mp4$/);
      expect(col.campaign).toBeTruthy();
      expect(col.frames).toBeTruthy();
      expect(col.statement).toBeTruthy();
    });
  });
});
