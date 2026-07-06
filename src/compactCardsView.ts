import {
  App,
  BasesEntry,
  BasesPropertyId,
  BasesView,
  QueryController,
  RenderContext,
  setIcon,
  TFile,
} from "obsidian";
import { ensureViewHelpButton } from "./viewHelp";
import { getStrings } from "./i18n";

export const COMPACT_CARDS_VIEW_TYPE = "Cards-Compact";

const DEFAULT_CARD_SIZE = 200;
const DEFAULT_ASPECT_RATIO = 1;

const EXTENSION_ICONS: Record<string, string> = {
  pdf: "file-text",
  md: "file-text",
  canvas: "layout-dashboard",
  png: "image",
  jpg: "image",
  jpeg: "image",
  gif: "image",
  webp: "image",
  svg: "image",
  bmp: "image",
  mp3: "music",
  wav: "music",
  flac: "music",
  ogg: "music",
  m4a: "music",
  mp4: "video",
  mov: "video",
  webm: "video",
  mkv: "video",
};

function getFileIcon(extension: string): string {
  return EXTENSION_ICONS[extension.toLowerCase()] ?? "file";
}

// Strips wikilink/embed brackets and an alias, leaving the bare link target.
function cleanLinkTarget(raw: string): string {
  return raw
    .trim()
    .replace(/^!?\[\[/, "")
    .replace(/\]\]$/, "")
    .split("|")[0]
    .trim();
}

// Resolves a frontmatter value (external URL, wikilink, or embed) to a
// displayable <img> src, or null if it can't be resolved to an image.
function resolveImageSrc(app: App, sourceFile: TFile, raw: string): string | null {
  const cleaned = cleanLinkTarget(raw);
  if (!cleaned) return null;
  if (/^https?:\/\//i.test(cleaned)) return cleaned;
  const dest = app.metadataCache.getFirstLinkpathDest(cleaned, sourceFile.path);
  return dest instanceof TFile ? app.vault.getResourcePath(dest) : null;
}

// Only frontmatter ("note.") properties can hold a cover image reference.
function getImageSrc(app: App, file: TFile, propId: BasesPropertyId | null): string | null {
  if (!propId) return null;
  const dot = propId.indexOf(".");
  if (dot === -1 || propId.slice(0, dot) !== "note") return null;
  const key = propId.slice(dot + 1);
  const frontmatter = app.metadataCache.getFileCache(file)?.frontmatter;
  const raw: unknown = frontmatter?.[key];
  if (!raw) return null;
  const value = Array.isArray(raw) ? (raw[0] as unknown) : raw;
  return typeof value === "string" ? resolveImageSrc(app, file, value) : null;
}

export class CompactCardsView extends BasesView {
  readonly type = COMPACT_CARDS_VIEW_TYPE;
  private gridEl: HTMLElement;

  constructor(controller: QueryController, containerEl: HTMLElement) {
    super(controller);
    containerEl.empty();
    containerEl.addClass("compact-cards-container");
    this.gridEl = containerEl.createDiv({ cls: "compact-cards-grid" });
  }

  private get isCompact(): boolean {
    const value = this.config.get("compact");
    return value === true || value === "compact";
  }

  private get showIcon(): boolean {
    return this.config.get("showIcon") !== false;
  }

  private get imageFit(): "cover" | "contain" {
    return this.config.get("imageFit") === "contain" ? "contain" : "cover";
  }

  private get imageAspectRatio(): number {
    return Number(this.config.get("imageAspectRatio")) || DEFAULT_ASPECT_RATIO;
  }

  private get cardSize(): number {
    return Number(this.config.get("cardSize")) || DEFAULT_CARD_SIZE;
  }

  onDataUpdated(): void {
    const t = getStrings();
    ensureViewHelpButton(this.gridEl, t.helpAria, () => ({
      title: "Cards Compact",
      lines: [t.compactHelpLine1, t.compactHelpLine2],
    }));

    this.gridEl.empty();

    const compact = this.isCompact;
    this.gridEl.toggleClass("compact-cards-grid-compact", compact);
    this.gridEl.style.setProperty("--compact-card-size", `${this.cardSize}px`);
    this.gridEl.style.setProperty("--compact-card-aspect", String(this.imageAspectRatio));

    const imagePropId = this.config.getAsPropertyId("imageProperty");

    for (const entry of this.data.data) {
      if (compact) {
        this.renderCompactCard(entry, imagePropId);
      } else {
        this.renderImageCard(entry, imagePropId);
      }
    }
  }

  private renderImageCard(entry: BasesEntry, imagePropId: BasesPropertyId | null): void {
    const cardEl = this.gridEl.createDiv({ cls: "compact-cards-card" });
    cardEl.addEventListener("click", () => {
      void this.app.workspace.getLeaf(false).openFile(entry.file);
    });

    const coverEl = cardEl.createDiv({
      cls: `compact-cards-cover is-${this.imageFit}`,
    });
    const src = getImageSrc(this.app, entry.file, imagePropId);
    if (src) {
      coverEl.createEl("img", { attr: { src, loading: "lazy" } });
    } else {
      coverEl.addClass("is-empty");
      setIcon(coverEl.createDiv({ cls: "compact-cards-cover-icon" }), getFileIcon(entry.file.extension));
    }

    cardEl.createDiv({ cls: "compact-cards-title", text: entry.file.basename });
    this.renderProperties(cardEl, entry);
  }

  // Notion-style compact row: same full-width cover image as the Normal
  // layout (only rendered when an image actually resolves — otherwise the
  // row stays lean with no empty placeholder), icon + title below, property
  // values as small inline pills.
  private renderCompactCard(entry: BasesEntry, imagePropId: BasesPropertyId | null): void {
    const cardEl = this.gridEl.createDiv({ cls: "compact-cards-card compact-cards-card-compact" });
    cardEl.addEventListener("click", () => {
      void this.app.workspace.getLeaf(false).openFile(entry.file);
    });

    const src = getImageSrc(this.app, entry.file, imagePropId);
    if (src) {
      const coverEl = cardEl.createDiv({ cls: `compact-cards-cover is-${this.imageFit}` });
      coverEl.createEl("img", { attr: { src, loading: "lazy" } });
    }

    const bodyEl = cardEl.createDiv({ cls: "compact-cards-body" });
    const headerEl = bodyEl.createDiv({ cls: "compact-cards-header" });
    if (this.showIcon) {
      const iconEl = headerEl.createDiv({ cls: "compact-cards-icon" });
      setIcon(iconEl, getFileIcon(entry.file.extension));
    }
    headerEl.createDiv({ cls: "compact-cards-title", text: entry.file.basename });

    this.renderPills(bodyEl, entry);
  }

  // Normal (Gallery) layout renders each configured property as a labeled
  // row — the property name above its value — matching Obsidian's native
  // Cards view. The label is shown for every property in the configured
  // order, even when the value is empty (native does the same). Which
  // properties appear is controlled by Bases' own "Properties" toolbar
  // picker (config.getOrder()). The leaner inline pills (renderPills) are
  // reserved for the Compact layout.
  private renderProperties(cardEl: HTMLElement, entry: BasesEntry): void {
    const order = this.config.getOrder();
    if (order.length === 0) return;

    const listEl = cardEl.createDiv({ cls: "compact-cards-properties" });
    const ctx = new RenderContext();
    for (const propId of order) {
      const rowEl = listEl.createDiv({ cls: "compact-cards-property" });
      rowEl.createDiv({
        cls: "compact-cards-property-label",
        text: this.config.getDisplayName(propId),
      });
      const valueEl = rowEl.createDiv({ cls: "compact-cards-property-value" });
      const value = entry.getValue(propId);
      if (value !== null) {
        value.renderTo(valueEl, ctx);
      }
    }
  }

  // Compact layout: property values as small inline pills (no name labels).
  private renderPills(cardEl: HTMLElement, entry: BasesEntry): void {
    const order = this.config.getOrder();
    if (order.length === 0) return;

    const rowEl = cardEl.createDiv({ cls: "compact-cards-pills" });
    const ctx = new RenderContext();
    for (const propId of order) {
      const value = entry.getValue(propId);
      if (value === null) continue;
      const pillEl = rowEl.createDiv({ cls: "compact-cards-pill" });
      value.renderTo(pillEl, ctx);
    }
  }
}
