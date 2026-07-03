import { describe, expect, it } from "vitest";
import {
  GROUP_COLOR_PALETTE,
  getAutoColor,
  hashStringToIndex,
  resolveGroupColor,
  type GroupColorOverrides,
} from "./groupColor";

describe("hashStringToIndex", () => {
  it("is deterministic for the same input", () => {
    expect(hashStringToIndex("Work", 8)).toBe(hashStringToIndex("Work", 8));
  });

  it("stays within [0, modulo)", () => {
    for (const value of ["a", "b", "Work", "Personal", "", "🚀emoji", "Long string with spaces"]) {
      const index = hashStringToIndex(value, 8);
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(8);
    }
  });

  it("produces different indices for different strings (spot check, not guaranteed)", () => {
    expect(hashStringToIndex("Work", 8)).not.toBe(hashStringToIndex("Personal", 8));
  });

  it("handles an empty string without throwing", () => {
    expect(() => hashStringToIndex("", 8)).not.toThrow();
  });
});

describe("getAutoColor", () => {
  it("always returns a color from the fixed palette", () => {
    expect(GROUP_COLOR_PALETTE).toContain(getAutoColor("Work"));
    expect(GROUP_COLOR_PALETTE).toContain(getAutoColor("Personal"));
    expect(GROUP_COLOR_PALETTE).toContain(getAutoColor(""));
  });

  it("is deterministic across calls", () => {
    expect(getAutoColor("Work")).toBe(getAutoColor("Work"));
  });

  it("the palette has at least 2 colors and every entry is a hex string", () => {
    expect(GROUP_COLOR_PALETTE.length).toBeGreaterThanOrEqual(2);
    for (const color of GROUP_COLOR_PALETTE) {
      expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });
});

describe("resolveGroupColor", () => {
  it("returns the override when present", () => {
    const overrides: GroupColorOverrides = { Work: "#ff0000" };
    expect(resolveGroupColor("Work", overrides)).toBe("#ff0000");
  });

  it("falls back to the auto color when no override exists", () => {
    const overrides: GroupColorOverrides = { Work: "#ff0000" };
    expect(resolveGroupColor("Personal", overrides)).toBe(getAutoColor("Personal"));
  });

  it("falls back to the auto color for an empty overrides object", () => {
    expect(resolveGroupColor("Work", {})).toBe(getAutoColor("Work"));
  });
});
