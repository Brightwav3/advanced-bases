import { describe, expect, it } from "vitest";
import moment from "moment";
import {
  buildBaseWikilink,
  buildFeedViewNoteBasename,
  buildFeedViewNotePath,
  renderFeedViewNoteTemplate,
} from "./feedViewNoteTemplate";

describe("buildFeedViewNoteBasename", () => {
  it('formats the date as "YYYY. M. D" and appends the base name', () => {
    const now = moment("2026-06-30");
    expect(buildFeedViewNoteBasename(now, "Francouzština pro začátečníky 1")).toBe(
      "2026. 6. 30 – Francouzština pro začátečníky 1"
    );
  });

  it("does not zero-pad single-digit months or days", () => {
    const now = moment("2026-01-05");
    expect(buildFeedViewNoteBasename(now, "Kurz")).toBe("2026. 1. 5 – Kurz");
  });
});

describe("buildFeedViewNotePath", () => {
  it("joins folder and basename with a .md extension", () => {
    expect(buildFeedViewNotePath("Škola/MUNI/lekce", "2026. 6. 30 – Kurz")).toBe(
      "Škola/MUNI/lekce/2026. 6. 30 – Kurz.md"
    );
  });

  it("strips a trailing slash from the folder", () => {
    expect(buildFeedViewNotePath("Škola/MUNI/lekce/", "2026. 6. 30 – Kurz")).toBe(
      "Škola/MUNI/lekce/2026. 6. 30 – Kurz.md"
    );
  });
});

describe("buildBaseWikilink", () => {
  it("wraps the base name in double brackets", () => {
    expect(buildBaseWikilink("Francouzština pro začátečníky 1")).toBe(
      "[[Francouzština pro začátečníky 1]]"
    );
  });
});

describe("renderFeedViewNoteTemplate", () => {
  it("substitutes {{title}}", () => {
    expect(renderFeedViewNoteTemplate("# {{title}}", "Lekce", moment())).toBe("# Lekce");
  });

  it("substitutes {{date:FORMAT}} using the provided moment", () => {
    const now = moment("2026-06-30");
    expect(renderFeedViewNoteTemplate("{{date:YYYY-MM-DD}}", "x", now)).toBe("2026-06-30");
  });

  it("substitutes bare {{date}} with a default format", () => {
    const now = moment("2026-06-30");
    expect(renderFeedViewNoteTemplate("{{date}}", "x", now)).toBe("2026-06-30");
  });
});
