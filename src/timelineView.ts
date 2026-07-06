/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-redundant-type-constituents */
import {
  BasesEntry,
  BasesView,
  QueryController,
  TFile,
} from "obsidian";
import moment from "moment";
import type { Moment } from "moment";
import {
  GroupColorOverrides,
  loadGroupColorOverrides,
  renderColorSwatch,
  resolveGroupColor,
  saveGroupColorOverride,
} from "./shared/groupColor";
import { TickUnit, generateAxisTicks, pickTickUnit } from "./timelineAxis";
import {
  BarGeometry,
  DateRange,
  LaneGroup,
  clampPxPerDay,
  computeBarGeometry,
  computeDateRange,
  dateToX,
  groupIntoLanes,
  zoomAnchoredPxPerDay,
} from "./timelineLayout";
import { getStrings } from "./i18n";
import { AdvancedBasesSettings } from "./settings";
import { ensureViewHelpButton } from "./viewHelp";

export const TIMELINE_VIEW_TYPE = "timeline";

// Config persistence key for this view's per-lane color overrides. Calendar
// and Board use their own distinct keys ("entryColors"/"columnColors" per
// the project's Timeline plan) so overrides never collide within a shared Base.
const LANE_COLORS_CONFIG_KEY = "laneColors";

const DEFAULT_LANE_HEIGHT = 48;
const AXIS_HEIGHT = 32;
const DEFAULT_PX_PER_DAY = 20;

interface TimelineEntry {
  entry: BasesEntry;
  start: Moment;
  end: Moment | null;
  groupValue: string | null;
}

export class TimelineView extends BasesView {
  readonly type = TIMELINE_VIEW_TYPE;

  private scrollEl: HTMLElement;
  private contentEl: HTMLElement;
  private axisEl: HTMLElement;
  private lanesEl: HTMLElement;
  private emptyStateEl: HTMLElement;

  private pxPerDay = DEFAULT_PX_PER_DAY;
  private laneColorOverrides: GroupColorOverrides = {};

  constructor(
    controller: QueryController,
    containerEl: HTMLElement,
    private getSettings: () => AdvancedBasesSettings
  ) {
    super(controller);
    containerEl.empty();
    containerEl.addClass("timeline-view-container");

    this.scrollEl = containerEl.createDiv({ cls: "timeline-view-scroll" });
    this.contentEl = this.scrollEl.createDiv({ cls: "timeline-view-content" });
    this.axisEl = this.contentEl.createDiv({ cls: "timeline-view-axis" });
    this.lanesEl = this.contentEl.createDiv({ cls: "timeline-view-lanes" });
    this.emptyStateEl = containerEl.createDiv({
      cls: "timeline-view-empty is-hidden",
      text: getStrings().timelineEmptyState,
    });

    this.scrollEl.addEventListener("wheel", this.onWheel, { passive: false });
  }

  onunload(): void {
    this.scrollEl.removeEventListener("wheel", this.onWheel);
  }

  private get dateProperty() {
    return this.config.getAsPropertyId("dateProperty");
  }

  private get endDateProperty() {
    return this.config.getAsPropertyId("endDateProperty");
  }

  private get groupProperty() {
    return this.config.getAsPropertyId("groupProperty");
  }

  private get laneHeight(): number {
    return Number(this.config.get("laneHeight")) || DEFAULT_LANE_HEIGHT;
  }

  private get todayMarkerColor(): string {
    const override = this.getSettings().todayMarkerColor;
    return override && override.length > 0 ? override : "var(--text-normal)";
  }

  // Resolves an entry's start date. Falls back to file.ctime when
  // dateProperty is unset on the view or empty on this specific entry, so
  // every entry always has *some* placement (project spec's fallback rule).
  private resolveStartDate(entry: BasesEntry): Moment {
    const dateProp = this.dateProperty;
    if (dateProp) {
      const value = entry.getValue(dateProp);
      if (value !== null) {
        const parsed = moment(value.toString());
        if (parsed.isValid()) return parsed;
      }
    }
    return moment(entry.file.stat.ctime);
  }

  private resolveEndDate(entry: BasesEntry): Moment | null {
    const endProp = this.endDateProperty;
    if (!endProp) return null;
    const value = entry.getValue(endProp);
    if (value === null) return null;
    const parsed = moment(value.toString());
    return parsed.isValid() ? parsed : null;
  }

  private resolveGroupValue(entry: BasesEntry): string | null {
    const groupProp = this.groupProperty;
    if (!groupProp) return null;
    const value = entry.getValue(groupProp);
    if (value === null) return null;
    const text = value.toString().trim();
    return text.length > 0 ? text : null;
  }

  onDataUpdated(): void {
    const t = getStrings();
    ensureViewHelpButton(this.scrollEl, t.helpAria, () => ({
      title: "Timeline",
      lines: [t.timelineHelpLine1, t.timelineHelpLine2, t.timelineHelpLine3],
    }));

    this.laneColorOverrides = loadGroupColorOverrides(this.config, LANE_COLORS_CONFIG_KEY);

    const timelineEntries: TimelineEntry[] = this.data.data.map((entry) => ({
      entry,
      start: this.resolveStartDate(entry),
      end: this.resolveEndDate(entry),
      groupValue: this.resolveGroupValue(entry),
    }));

    const isEmpty = timelineEntries.length === 0;
    this.emptyStateEl.toggleClass("is-hidden", !isEmpty);
    this.scrollEl.toggleClass("is-hidden", isEmpty);
    if (isEmpty) return;

    const allDates = timelineEntries.flatMap((te) => (te.end ? [te.start, te.end] : [te.start]));
    const range = computeDateRange(allDates);
    const lanes = groupIntoLanes(timelineEntries, (te) => te.groupValue);

    this.render(range, lanes);
  }

  private render(range: DateRange, lanes: LaneGroup<TimelineEntry>[]): void {
    this.pxPerDay = clampPxPerDay(this.pxPerDay);
    const totalDays = range.end.diff(range.start, "days", true);
    const totalWidth = Math.max(1, totalDays * this.pxPerDay);
    const totalHeight = AXIS_HEIGHT + lanes.length * this.laneHeight;

    this.contentEl.style.width = `${totalWidth}px`;
    this.contentEl.style.height = `${totalHeight}px`;

    this.renderAxis(range, totalWidth);
    this.renderLanes(range, lanes);
    this.renderTodayMarker(range, totalHeight);
  }

  private renderAxis(range: DateRange, totalWidth: number): void {
    this.axisEl.empty();
    this.axisEl.style.width = `${totalWidth}px`;
    this.axisEl.style.height = `${AXIS_HEIGHT}px`;

    const unit: TickUnit = pickTickUnit(this.pxPerDay);
    const ticks = generateAxisTicks(range.start, range.end, this.pxPerDay, unit);

    for (const tick of ticks) {
      const x = dateToX(tick.date, range.start, this.pxPerDay);
      const tickEl = this.axisEl.createDiv({ cls: "timeline-view-axis-tick" });
      tickEl.style.left = `${x}px`;
      tickEl.createDiv({ cls: "timeline-view-axis-tick-line" });
      tickEl.createDiv({ cls: "timeline-view-axis-tick-label", text: tick.label });
    }
  }

  private renderLanes(range: DateRange, lanes: LaneGroup<TimelineEntry>[]): void {
    this.lanesEl.empty();
    this.lanesEl.style.top = `${AXIS_HEIGHT}px`;

    lanes.forEach((lane, laneIndex) => {
      const laneEl = this.lanesEl.createDiv({ cls: "timeline-view-lane" });
      laneEl.style.top = `${laneIndex * this.laneHeight}px`;
      laneEl.style.height = `${this.laneHeight}px`;

      const color = resolveGroupColor(lane.key, this.laneColorOverrides);

      if (lane.key.length > 0) {
        this.renderLaneHeader(lane.key, color);
      }

      for (const te of lane.entries) {
        this.renderBar(laneEl, te, range, color);
      }
    });
  }

  private renderLaneHeader(groupValue: string, color: string): void {
    const headerEl = this.lanesEl.createDiv({ cls: "timeline-view-lane-header" });
    headerEl.createSpan({ cls: "timeline-view-lane-header-label", text: groupValue });
    renderColorSwatch(headerEl, color, (hex) => {
      saveGroupColorOverride(this.config, LANE_COLORS_CONFIG_KEY, groupValue, hex);
      this.onDataUpdated();
    });
  }

  private renderBar(laneEl: HTMLElement, te: TimelineEntry, range: DateRange, color: string): void {
    const geometry: BarGeometry = computeBarGeometry(te.start, te.end, range.start, this.pxPerDay);
    const isMarker = te.end === null;

    const barEl = laneEl.createDiv({
      cls: isMarker ? "timeline-view-marker" : "timeline-view-bar",
      attr: { title: te.entry.file.basename },
    });
    barEl.style.left = `${geometry.left}px`;
    barEl.style.width = `${geometry.width}px`;
    barEl.style.backgroundColor = color;

    barEl.createSpan({ cls: "timeline-view-bar-label", text: te.entry.file.basename });

    barEl.addEventListener("click", () => {
      this.app.workspace.getLeaf(false).openFile(te.entry.file);
    });
  }

  private renderTodayMarker(range: DateRange, totalHeight: number): void {
    this.contentEl.querySelector(".timeline-view-today-marker")?.remove();

    const today = moment();
    if (today.isBefore(range.start) || today.isAfter(range.end)) return;

    const x = dateToX(today, range.start, this.pxPerDay);
    const markerEl = this.contentEl.createDiv({ cls: "timeline-view-today-marker" });
    markerEl.style.left = `${x}px`;
    markerEl.style.height = `${totalHeight}px`;
    markerEl.style.backgroundColor = this.todayMarkerColor;
  }

  private onWheel = (event: WheelEvent): void => {
    if (!event.ctrlKey) {
      // Plain wheel motion pans horizontally (project spec: "mouse wheel
      // scroll ... translates to horizontal scroll"). Vertical wheel delta
      // is remapped to horizontal scroll; native horizontal wheel/trackpad
      // motion (deltaX) is left untouched since it already scrolls
      // horizontally on its own.
      if (event.deltaY !== 0) {
        event.preventDefault();
        this.scrollEl.scrollLeft += event.deltaY;
      }
      return;
    }

    // Ctrl+scroll (and macOS pinch, which browsers synthesize as
    // ctrlKey: true wheel events) zooms, anchored at the cursor position.
    event.preventDefault();

    const rect = this.scrollEl.getBoundingClientRect();
    const cursorXInScroll = event.clientX - rect.left;
    const cursorXInContent = cursorXInScroll + this.scrollEl.scrollLeft;
    const dateUnderCursorDays = cursorXInContent / this.pxPerDay;

    const nextPxPerDay = zoomAnchoredPxPerDay(this.pxPerDay, event.deltaY);
    this.pxPerDay = nextPxPerDay;

    this.onDataUpdated();

    const newCursorXInContent = dateUnderCursorDays * nextPxPerDay;
    this.scrollEl.scrollLeft = newCursorXInContent - cursorXInScroll;
  };
}
