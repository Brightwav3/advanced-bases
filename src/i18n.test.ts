import { describe, expect, it } from "vitest";
import { format, resolveLocale } from "./i18n";

describe("resolveLocale", () => {
  it("returns an exact supported match", () => {
    expect(resolveLocale("de")).toBe("de");
  });

  it("falls back to the base language for regional variants", () => {
    expect(resolveLocale("zh-CN")).toBe("zh");
    expect(resolveLocale("pt-BR")).toBe("pt");
  });

  it("falls back to English for unsupported languages", () => {
    expect(resolveLocale("xx")).toBe("en");
  });

  it("falls back to English when nothing is provided", () => {
    expect(resolveLocale(null)).toBe("en");
    expect(resolveLocale(undefined)).toBe("en");
  });
});

describe("format", () => {
  it("substitutes named placeholders", () => {
    expect(format("Template not found: {path}", { path: "foo/bar.md" })).toBe(
      "Template not found: foo/bar.md"
    );
  });
});
