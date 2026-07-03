/**
 * Shared group-coloring module. Used by Timeline (per-lane colors),
 * and reused as-is by Calendar (per-entry colors, grouped by property)
 * and Board (per-column colors) — see the project spec's "Shared
 * group-coloring module" cross-cutting decision. Do not fork this file;
 * add view-specific behavior at the call site instead.
 *
 * Each consuming view picks its own config persistence key (Timeline
 * uses "laneColors" — see timelineView.ts) so overrides never collide
 * between views sharing the same Base.
 */

// A small, fixed, theme-agnostic palette. Chosen to be visually distinct
// from one another at a glance and to read reasonably on both light and
// dark backgrounds (mid-saturation, mid-lightness swatches rather than
// pure/neon or near-black/near-white extremes).
export const GROUP_COLOR_PALETTE: string[] = [
  "#e06c75", // red
  "#e5a94c", // orange
  "#e5c94c", // yellow
  "#98c379", // green
  "#56b6c2", // cyan
  "#61afef", // blue
  "#b389f0", // purple
  "#d47fb0", // pink
];

/**
 * Deterministic string hash (djb2 variant), reduced into [0, modulo).
 * Pure and stable across sessions/platforms so the same group value
 * always maps to the same palette index.
 */
export function hashStringToIndex(value: string, modulo: number): number {
  let hash = 5381;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 33) ^ value.charCodeAt(i);
  }
  // >>> 0 forces an unsigned 32-bit result before the modulo, so the
  // result is always non-negative regardless of hash's sign.
  return (hash >>> 0) % modulo;
}

export function getAutoColor(value: string): string {
  const index = hashStringToIndex(value, GROUP_COLOR_PALETTE.length);
  return GROUP_COLOR_PALETTE[index];
}

export type GroupColorOverrides = Record<string, string>;

export function resolveGroupColor(value: string, overrides: GroupColorOverrides): string {
  return overrides[value] ?? getAutoColor(value);
}

export function loadGroupColorOverrides(
  config: { get(key: string): unknown },
  key: string
): GroupColorOverrides {
  const raw = config.get(key);
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const result: GroupColorOverrides = {};
    for (const [groupValue, hex] of Object.entries(raw as Record<string, unknown>)) {
      if (typeof hex === "string") result[groupValue] = hex;
    }
    return result;
  }
  return {};
}

export function saveGroupColorOverride(
  config: { get(key: string): unknown; set(key: string, value: unknown): void },
  key: string,
  groupValue: string,
  hex: string
): void {
  const current = loadGroupColorOverrides(config, key);
  current[groupValue] = hex;
  config.set(key, current);
}

/**
 * Renders a small native color-swatch button into parentEl. Clicking the
 * swatch opens the browser's native color picker (a hidden
 * <input type="color">); confirming a new color fires onChange with the
 * chosen hex string. Returns the swatch button element so callers can
 * reposition/restyle it if needed.
 */
export function renderColorSwatch(
  parentEl: HTMLElement,
  currentColor: string,
  onChange: (hex: string) => void
): HTMLElement {
  const swatchEl = parentEl.createEl("button", {
    cls: "advanced-bases-color-swatch",
    attr: { type: "button", "aria-label": "Change color" },
  });
  swatchEl.setCssProps({ "--swatch-color": currentColor });

  const inputEl = parentEl.createEl("input", {
    attr: { type: "color", value: currentColor },
  });
  inputEl.setCssStyles({ display: "none" });

  swatchEl.addEventListener("click", (event) => {
    event.stopPropagation();
    inputEl.click();
  });

  inputEl.addEventListener("input", () => {
    swatchEl.setCssProps({ "--swatch-color": inputEl.value });
    onChange(inputEl.value);
  });

  return swatchEl;
}
