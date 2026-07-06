/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-redundant-type-constituents */
import type { Moment } from "moment";
import moment from "moment";

/**
 * The one function in the whole Timeline view that needs the most manual
 * testing across the full zoom range (project spec, "Axis tick generation").
 * Keep this file self-contained and free of DOM/Obsidian dependencies so it
 * stays trivially unit-testable.
 */

export type TickUnit =
  | "day"
  | "week"
  | "month"
  | "quarter"
  | "year"
  | "5years"
  | "10years"
  | "25years"
  | "100years";

// Ordered from finest to coarsest. Average day-span of each unit, used to
// decide when a unit's ticks are spaced comfortably (>= minLabelSpacingPx
// apart) at the current pxPerDay.
export const TICK_CASCADE: TickUnit[] = [
  "day",
  "week",
  "month",
  "quarter",
  "year",
  "5years",
  "10years",
  "25years",
  "100years",
];

const UNIT_DAY_SPAN: Record<TickUnit, number> = {
  day: 1,
  week: 7,
  month: 30.44, // average Gregorian month length
  quarter: 91.3125, // 365.25 / 4
  year: 365.25,
  "5years": 5 * 365.25,
  "10years": 10 * 365.25,
  "25years": 25 * 365.25,
  "100years": 100 * 365.25,
};

/**
 * Picks the coarsest tick unit whose average tick spacing (at the given
 * pxPerDay) is still >= minLabelSpacingPx, walking the cascade from finest
 * to coarsest and returning the first unit that already clears the bar. If
 * even 'day' is too narrow, 'day' is still returned as the finest
 * available fallback would be even worse; if every unit up to '100years'
 * is still too narrow (extremely zoomed out), '100years' is returned since
 * it's the coarsest option available.
 */
export function pickTickUnit(pxPerDay: number, minLabelSpacingPx = 60): TickUnit {
  for (const unit of TICK_CASCADE) {
    const spacingPx = UNIT_DAY_SPAN[unit] * pxPerDay;
    if (spacingPx >= minLabelSpacingPx) {
      return unit;
    }
  }
  return "100years";
}

export interface AxisTick {
  date: Moment;
  label: string;
}

function quarterLabel(date: Moment): string {
  return `Q${Math.floor(date.month() / 3) + 1}`;
}

function decadeLabel(date: Moment): string {
  const decadeStart = Math.floor(date.year() / 10) * 10;
  return `${decadeStart}s`;
}

function periodLabel(date: Moment, spanYears: number): string {
  const periodStart = Math.floor(date.year() / spanYears) * spanYears;
  return `${periodStart}s`;
}

export function formatTickLabel(date: Moment, unit: TickUnit): string {
  switch (unit) {
    case "day":
    case "week":
      return String(date.date());
    case "month":
      return date.format("MMM");
    case "quarter":
      return quarterLabel(date);
    case "year":
    case "5years":
      return String(date.year());
    case "10years":
      return decadeLabel(date);
    case "25years":
      return periodLabel(date, 25);
    case "100years":
      return periodLabel(date, 100);
  }
}

/**
 * Generates every tick between rangeStart and rangeEnd (inclusive) for the
 * given unit, aligned to a sensible boundary for that unit (week start,
 * month start, quarter start, year start, or decade/25-year/century
 * boundary) so ticks land on "nice" dates rather than an arbitrary offset
 * from rangeStart.
 */
export function generateAxisTicks(
  rangeStart: Moment,
  rangeEnd: Moment,
  pxPerDay: number,
  unit: TickUnit
): AxisTick[] {
  if (rangeStart.isAfter(rangeEnd)) return [];

  const ticks: AxisTick[] = [];

  switch (unit) {
    case "day": {
      const cursor = rangeStart.clone().startOf("day");
      while (!cursor.isAfter(rangeEnd)) {
        ticks.push({ date: cursor.clone(), label: formatTickLabel(cursor, unit) });
        cursor.add(1, "day");
      }
      break;
    }
    case "week": {
      const cursor = rangeStart.clone().startOf("week");
      while (!cursor.isAfter(rangeEnd)) {
        if (!cursor.isBefore(rangeStart, "day")) {
          ticks.push({ date: cursor.clone(), label: formatTickLabel(cursor, unit) });
        }
        cursor.add(1, "week");
      }
      break;
    }
    case "month": {
      const cursor = rangeStart.clone().startOf("month");
      while (!cursor.isAfter(rangeEnd)) {
        ticks.push({ date: cursor.clone(), label: formatTickLabel(cursor, unit) });
        cursor.add(1, "month");
      }
      break;
    }
    case "quarter": {
      const cursor = rangeStart.clone().startOf("quarter");
      while (!cursor.isAfter(rangeEnd)) {
        ticks.push({ date: cursor.clone(), label: formatTickLabel(cursor, unit) });
        cursor.add(3, "months");
      }
      break;
    }
    case "year": {
      const cursor = rangeStart.clone().startOf("year");
      while (!cursor.isAfter(rangeEnd)) {
        ticks.push({ date: cursor.clone(), label: formatTickLabel(cursor, unit) });
        cursor.add(1, "year");
      }
      break;
    }
    case "5years":
    case "10years":
    case "25years":
    case "100years": {
      const spanYears =
        unit === "5years" ? 5 : unit === "10years" ? 10 : unit === "25years" ? 25 : 100;
      const alignedStartYear = Math.floor(rangeStart.year() / spanYears) * spanYears;
      const cursor = rangeStart.clone().year(alignedStartYear).startOf("year");
      while (!cursor.isAfter(rangeEnd)) {
        if (!cursor.isBefore(rangeStart, "year")) {
          ticks.push({ date: cursor.clone(), label: formatTickLabel(cursor, unit) });
        }
        cursor.add(spanYears, "years");
      }
      break;
    }
  }

  return ticks;
}
