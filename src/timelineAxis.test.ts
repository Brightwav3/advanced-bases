import { describe, expect, it } from "vitest";
import moment from "moment";
import {
  TICK_CASCADE,
  formatTickLabel,
  generateAxisTicks,
  pickTickUnit,
} from "./timelineAxis";

describe("pickTickUnit", () => {
  // Approximate px-per-day values for each unit's natural width, derived
  // from wanting a tick label roughly every 60px: unit's average day-span
  // times pxPerDay should be >= 60.
  it("picks 'day' when zoomed in enough that each day is >= 60px", () => {
    expect(pickTickUnit(80)).toBe("day");
    expect(pickTickUnit(1000)).toBe("day");
  });

  it("picks 'week' once a day is too narrow but a week (7 days) still clears 60px", () => {
    expect(pickTickUnit(60 / 7 + 1)).toBe("week");
  });

  it("picks 'month' once a week is too narrow but a month (~30.44 days) clears 60px", () => {
    expect(pickTickUnit(60 / 7 - 0.01)).toBe("month");
  });

  it("picks 'quarter' once a month is too narrow but a quarter (~91.3 days) clears 60px", () => {
    expect(pickTickUnit(60 / 30.44 - 0.01)).toBe("quarter");
  });

  it("picks 'year' once a quarter is too narrow but a year (365.25 days) clears 60px", () => {
    expect(pickTickUnit(60 / 91.3125 - 0.001)).toBe("year");
  });

  it("picks '5years' once a year is too narrow but 5 years clears 60px", () => {
    expect(pickTickUnit(60 / 365.25 - 0.0001)).toBe("5years");
  });

  it("picks '10years' once 5 years is too narrow but 10 years clears 60px", () => {
    expect(pickTickUnit(60 / (5 * 365.25) - 0.00001)).toBe("10years");
  });

  it("picks '25years' once 10 years is too narrow but 25 years clears 60px", () => {
    expect(pickTickUnit(60 / (10 * 365.25) - 0.000001)).toBe("25years");
  });

  it("picks '100years' at the coarsest zoom, even when 25 years is still too narrow", () => {
    expect(pickTickUnit(0.0000001)).toBe("100years");
  });

  it("never returns a unit outside the fixed cascade", () => {
    for (const pxPerDay of [0.00000001, 0.001, 0.1, 1, 5, 50, 500, 5000]) {
      expect(TICK_CASCADE).toContain(pickTickUnit(pxPerDay));
    }
  });

  it("respects a custom minLabelSpacingPx", () => {
    // With a much smaller required spacing, a lower pxPerDay still resolves to 'day'.
    expect(pickTickUnit(2, 1)).toBe("day");
  });
});

describe("formatTickLabel", () => {
  const d = moment("2026-06-12");

  it("formats a day tick as the day-of-month number", () => {
    expect(formatTickLabel(d, "day")).toBe("12");
  });

  it("formats a week tick as the day-of-month number", () => {
    expect(formatTickLabel(d, "week")).toBe("12");
  });

  it("formats a month tick as the abbreviated month name", () => {
    expect(formatTickLabel(d, "month")).toBe("Jun");
  });

  it("formats a quarter tick as 'Q<n>'", () => {
    expect(formatTickLabel(moment("2026-01-15"), "quarter")).toBe("Q1");
    expect(formatTickLabel(moment("2026-04-15"), "quarter")).toBe("Q2");
    expect(formatTickLabel(moment("2026-07-15"), "quarter")).toBe("Q3");
    expect(formatTickLabel(moment("2026-10-15"), "quarter")).toBe("Q4");
  });

  it("formats a year tick as the 4-digit year", () => {
    expect(formatTickLabel(d, "year")).toBe("2026");
  });

  it("formats a 5-year tick as the 4-digit year", () => {
    expect(formatTickLabel(d, "5years")).toBe("2026");
  });

  it("formats a 10-year tick as a decade label", () => {
    expect(formatTickLabel(moment("2020-01-01"), "10years")).toBe("2020s");
    expect(formatTickLabel(moment("2029-06-01"), "10years")).toBe("2020s");
  });

  it("formats a 25-year tick as a decade label", () => {
    expect(formatTickLabel(moment("2000-01-01"), "25years")).toBe("2000s");
  });

  it("formats a 100-year tick as a century label", () => {
    expect(formatTickLabel(moment("2026-01-01"), "100years")).toBe("2000s");
    expect(formatTickLabel(moment("1990-01-01"), "100years")).toBe("1900s");
  });
});

describe("generateAxisTicks", () => {
  it("generates one tick per day for a 'day' unit across a short range", () => {
    const start = moment("2026-06-01");
    const end = moment("2026-06-05");
    const ticks = generateAxisTicks(start, end, 80, "day");
    expect(ticks.map((t) => t.label)).toEqual(["1", "2", "3", "4", "5"]);
  });

  it("generates one tick per week, aligned to week start, for a 'week' unit", () => {
    const start = moment("2026-06-01"); // a Monday
    const end = moment("2026-06-22");
    const ticks = generateAxisTicks(start, end, 10, "week");
    expect(ticks.length).toBeGreaterThanOrEqual(3);
    // Every tick date must itself fall on the same weekday as the range start's week alignment.
    const firstWeekday = ticks[0].date.day();
    for (const tick of ticks) {
      expect(tick.date.day()).toBe(firstWeekday);
    }
  });

  it("generates one tick per month, on the 1st, for a 'month' unit", () => {
    const start = moment("2026-01-15");
    const end = moment("2026-06-15");
    const ticks = generateAxisTicks(start, end, 3, "month");
    expect(ticks.map((t) => t.date.date())).toEqual([1, 1, 1, 1, 1, 1]);
    expect(ticks.map((t) => t.label)).toEqual(["Jan", "Feb", "Mar", "Apr", "May", "Jun"]);
  });

  it("generates one tick per quarter for a 'quarter' unit", () => {
    const start = moment("2025-01-01");
    const end = moment("2026-12-31");
    const ticks = generateAxisTicks(start, end, 1, "quarter");
    expect(ticks.map((t) => t.label)).toEqual(["Q1", "Q2", "Q3", "Q4", "Q1", "Q2", "Q3", "Q4"]);
  });

  it("generates one tick per year for a 'year' unit", () => {
    const start = moment("2020-01-01");
    const end = moment("2024-12-31");
    const ticks = generateAxisTicks(start, end, 0.5, "year");
    expect(ticks.map((t) => t.label)).toEqual(["2020", "2021", "2022", "2023", "2024"]);
  });

  it("generates one tick every 5 years for a '5years' unit", () => {
    const start = moment("2000-01-01");
    const end = moment("2025-12-31");
    const ticks = generateAxisTicks(start, end, 0.05, "5years");
    expect(ticks.map((t) => t.label)).toEqual(["2000", "2005", "2010", "2015", "2020", "2025"]);
  });

  it("generates one tick every 10 years for a '10years' unit", () => {
    const start = moment("1980-01-01");
    const end = moment("2029-12-31");
    const ticks = generateAxisTicks(start, end, 0.02, "10years");
    expect(ticks.map((t) => t.label)).toEqual(["1980s", "1990s", "2000s", "2010s", "2020s"]);
  });

  it("generates one tick every 25 years for a '25years' unit", () => {
    const start = moment("1950-01-01");
    const end = moment("2049-12-31");
    const ticks = generateAxisTicks(start, end, 0.005, "25years");
    expect(ticks.map((t) => t.label)).toEqual(["1950s", "1975s", "2000s", "2025s"]);
  });

  it("generates one tick every 100 years for a '100years' unit", () => {
    const start = moment("1700-01-01");
    const end = moment("2099-12-31");
    const ticks = generateAxisTicks(start, end, 0.0005, "100years");
    expect(ticks.map((t) => t.label)).toEqual(["1700s", "1800s", "1900s", "2000s"]);
  });

  it("returns an empty array when start is after end", () => {
    expect(generateAxisTicks(moment("2026-06-05"), moment("2026-06-01"), 80, "day")).toEqual([]);
  });
});
