/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-redundant-type-constituents */
import type { Moment } from "moment";
import moment from "moment";

// 100-year zoom: the full range (~36525 days) still renders at a nonzero
// width. 1-day zoom: a single day is comfortably wide on screen.
export const MIN_PX_PER_DAY = 0.002;
export const MAX_PX_PER_DAY = 2000;

export function clampPxPerDay(pxPerDay: number): number {
  return Math.min(MAX_PX_PER_DAY, Math.max(MIN_PX_PER_DAY, pxPerDay));
}

export interface DateRange {
  start: Moment;
  end: Moment;
}

/**
 * Computes the full date range to render: earliest to latest date among
 * `dates`, padded by `paddingDays` on both ends so bars/markers at the
 * extremes aren't flush against the scrollable edge. Falls back to a
 * range centered on today when `dates` is empty (e.g. a Base with no
 * matching entries) so the view always has a sensible axis to draw.
 */
export function computeDateRange(dates: Moment[], paddingDays = 30): DateRange {
  if (dates.length === 0) {
    const today = moment();
    return {
      start: today.clone().subtract(paddingDays, "days"),
      end: today.clone().add(paddingDays, "days"),
    };
  }

  let earliest = dates[0];
  let latest = dates[0];
  for (const date of dates) {
    if (date.isBefore(earliest)) earliest = date;
    if (date.isAfter(latest)) latest = date;
  }

  return {
    start: earliest.clone().subtract(paddingDays, "days"),
    end: latest.clone().add(paddingDays, "days"),
  };
}

export function dateToX(date: Moment, rangeStart: Moment, pxPerDay: number): number {
  const daysElapsed = date.diff(rangeStart, "days", true);
  return daysElapsed * pxPerDay;
}

export function xToDate(x: number, rangeStart: Moment, pxPerDay: number): Moment {
  const days = x / pxPerDay;
  return rangeStart.clone().add(days, "days");
}

export interface BarGeometry {
  left: number;
  width: number;
}

/**
 * Computes the left/width geometry (in px, relative to the content div's
 * origin) for one entry's bar or marker.
 *
 * - When endDate is null: a fixed-width point marker of minMarkerWidth,
 *   horizontally centered on startDate's x position.
 * - When endDate is present: a bar spanning startDate -> endDate (swapped
 *   if endDate is chronologically before startDate, so width is never
 *   negative), with its width floored at minMarkerWidth so a same-day or
 *   sub-day span still renders as a visible sliver rather than vanishing.
 */
export function computeBarGeometry(
  startDate: Moment,
  endDate: Moment | null,
  rangeStart: Moment,
  pxPerDay: number,
  minMarkerWidth = 12
): BarGeometry {
  if (endDate === null) {
    const centerX = dateToX(startDate, rangeStart, pxPerDay);
    return { left: centerX - minMarkerWidth / 2, width: minMarkerWidth };
  }

  const [earlier, later] = startDate.isAfter(endDate) ? [endDate, startDate] : [startDate, endDate];
  const left = dateToX(earlier, rangeStart, pxPerDay);
  const right = dateToX(later, rangeStart, pxPerDay);
  const width = Math.max(minMarkerWidth, right - left);
  return { left, width };
}

export interface LaneGroup<T> {
  key: string;
  entries: T[];
}

/**
 * Groups `items` into lanes keyed by `getGroupValue(item)`, preserving
 * first-seen order of distinct group values (project spec: "each distinct
 * value becomes one horizontal lane, in first-seen order"). A null or
 * empty-string group value collapses every such item into one lane keyed
 * by an empty string, matching the "no groupProperty configured -> single
 * flat lane" behavior.
 */
export function groupIntoLanes<T>(
  items: T[],
  getGroupValue: (item: T) => string | null
): LaneGroup<T>[] {
  const laneOrder: string[] = [];
  const laneMap = new Map<string, T[]>();

  for (const item of items) {
    const rawKey = getGroupValue(item);
    const key = rawKey ?? "";
    if (!laneMap.has(key)) {
      laneMap.set(key, []);
      laneOrder.push(key);
    }
    laneMap.get(key)!.push(item);
  }

  return laneOrder.map((key) => ({ key, entries: laneMap.get(key)! }));
}

/**
 * Computes the next pxPerDay for a Ctrl+wheel zoom step. Uses an
 * exponential curve (rather than linear) so zooming feels proportional at
 * every scale — the same relative wheel motion zooms in/out by the same
 * *percentage* whether you're at 1-day or 100-year zoom, not the same
 * absolute pxPerDay delta (which would be imperceptible at coarse zoom and
 * violent at fine zoom). Negative deltaY (scrolling up / pinch-out) zooms
 * in; positive deltaY (scrolling down / pinch-in) zooms out. The caller
 * (timelineView.ts) is responsible for anchoring the visible range to the
 * cursor position after calling this — this function only computes the
 * new pxPerDay value.
 */
export function zoomAnchoredPxPerDay(
  currentPxPerDay: number,
  deltaY: number,
  zoomFactorPerNotch = 0.0015
): number {
  const factor = Math.exp(-deltaY * zoomFactorPerNotch);
  return clampPxPerDay(currentPxPerDay * factor);
}
