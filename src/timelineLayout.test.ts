import { describe, expect, it } from "vitest";
import moment from "moment";
import {
  MAX_PX_PER_DAY,
  MIN_PX_PER_DAY,
  clampPxPerDay,
  computeBarGeometry,
  computeDateRange,
  dateToX,
  groupIntoLanes,
  xToDate,
  zoomAnchoredPxPerDay,
} from "./timelineLayout";

describe("clampPxPerDay", () => {
  it("clamps below the minimum up to MIN_PX_PER_DAY", () => {
    expect(clampPxPerDay(0)).toBe(MIN_PX_PER_DAY);
    expect(clampPxPerDay(-5)).toBe(MIN_PX_PER_DAY);
  });

  it("clamps above the maximum down to MAX_PX_PER_DAY", () => {
    expect(clampPxPerDay(1_000_000)).toBe(MAX_PX_PER_DAY);
  });

  it("passes through values already within range", () => {
    expect(clampPxPerDay(50)).toBe(50);
  });
});

describe("computeDateRange", () => {
  it("spans from the earliest to latest date, padded by paddingDays on both ends", () => {
    const dates = [moment("2026-03-01"), moment("2026-01-10"), moment("2026-06-15")];
    const range = computeDateRange(dates, moment(), 10);
    expect(range.start.format("YYYY-MM-DD")).toBe(
      moment("2026-01-10").subtract(10, "days").format("YYYY-MM-DD")
    );
    expect(range.end.format("YYYY-MM-DD")).toBe(
      moment("2026-06-15").add(10, "days").format("YYYY-MM-DD")
    );
  });

  it("uses the default 30-day padding when not specified", () => {
    const dates = [moment("2026-05-01")];
    const range = computeDateRange(dates, moment());
    expect(range.start.format("YYYY-MM-DD")).toBe(
      moment("2026-05-01").subtract(30, "days").format("YYYY-MM-DD")
    );
    expect(range.end.format("YYYY-MM-DD")).toBe(
      moment("2026-05-01").add(30, "days").format("YYYY-MM-DD")
    );
  });

  it("returns a range centered on now when given an empty array", () => {
    const today = moment();
    const range = computeDateRange([], today, 5);
    expect(range.start.format("YYYY-MM-DD")).toBe(today.clone().subtract(5, "days").format("YYYY-MM-DD"));
    expect(range.end.format("YYYY-MM-DD")).toBe(today.clone().add(5, "days").format("YYYY-MM-DD"));
  });
});

describe("dateToX / xToDate", () => {
  const rangeStart = moment("2026-01-01");

  it("dateToX maps rangeStart itself to x=0", () => {
    expect(dateToX(rangeStart, rangeStart, 10)).toBe(0);
  });

  it("dateToX scales linearly by days elapsed times pxPerDay", () => {
    expect(dateToX(moment("2026-01-11"), rangeStart, 10)).toBe(100);
  });

  it("xToDate is the inverse of dateToX", () => {
    const date = moment("2026-03-15T00:00:00");
    const x = dateToX(date, rangeStart, 25);
    const back = xToDate(x, rangeStart, 25);
    expect(back.format("YYYY-MM-DD")).toBe(date.format("YYYY-MM-DD"));
  });
});

describe("computeBarGeometry", () => {
  const rangeStart = moment("2026-01-01");

  it("produces a fixed-width point marker when endDate is null", () => {
    const geo = computeBarGeometry(moment("2026-01-11"), null, rangeStart, 10, 12);
    expect(geo.width).toBe(12);
    // Centered on the start date's x position.
    expect(geo.left).toBe(100 - 6);
  });

  it("spans left-to-right between startDate and endDate when both are given", () => {
    const geo = computeBarGeometry(moment("2026-01-11"), moment("2026-01-21"), rangeStart, 10, 12);
    expect(geo.left).toBe(100);
    expect(geo.width).toBe(100);
  });

  it("floors the width at minMarkerWidth for a same-day or near-zero span", () => {
    const geo = computeBarGeometry(moment("2026-01-11"), moment("2026-01-11"), rangeStart, 10, 12);
    expect(geo.width).toBe(12);
  });

  it("swaps start/end if end is before start, so width is never negative", () => {
    const geo = computeBarGeometry(moment("2026-01-21"), moment("2026-01-11"), rangeStart, 10, 12);
    expect(geo.left).toBe(100);
    expect(geo.width).toBe(100);
  });
});

describe("groupIntoLanes", () => {
  it("groups items by first-seen order of their group value", () => {
    const items = ["a1", "b1", "a2", "c1", "b2"];
    const lanes = groupIntoLanes(items, (item) => item[0]);
    expect(lanes.map((l) => l.key)).toEqual(["a", "b", "c"]);
    expect(lanes.find((l) => l.key === "a")?.entries).toEqual(["a1", "a2"]);
    expect(lanes.find((l) => l.key === "b")?.entries).toEqual(["b1", "b2"]);
    expect(lanes.find((l) => l.key === "c")?.entries).toEqual(["c1"]);
  });

  it("collapses null/empty group values into a single lane keyed by an empty string", () => {
    const items = [1, 2, 3];
    const lanes = groupIntoLanes(items, () => null);
    expect(lanes).toHaveLength(1);
    expect(lanes[0].key).toBe("");
    expect(lanes[0].entries).toEqual([1, 2, 3]);
  });

  it("returns an empty array for an empty input", () => {
    expect(groupIntoLanes([], () => "x")).toEqual([]);
  });
});

describe("zoomAnchoredPxPerDay", () => {
  it("increases pxPerDay for a negative deltaY (scroll up / zoom in)", () => {
    const next = zoomAnchoredPxPerDay(10, -100);
    expect(next).toBeGreaterThan(10);
  });

  it("decreases pxPerDay for a positive deltaY (scroll down / zoom out)", () => {
    const next = zoomAnchoredPxPerDay(10, 100);
    expect(next).toBeLessThan(10);
  });

  it("never returns a value outside [MIN_PX_PER_DAY, MAX_PX_PER_DAY]", () => {
    expect(zoomAnchoredPxPerDay(MIN_PX_PER_DAY, 100000)).toBe(MIN_PX_PER_DAY);
    expect(zoomAnchoredPxPerDay(MAX_PX_PER_DAY, -100000)).toBe(MAX_PX_PER_DAY);
  });

  it("returns the same value for deltaY = 0", () => {
    expect(zoomAnchoredPxPerDay(10, 0)).toBe(10);
  });
});
