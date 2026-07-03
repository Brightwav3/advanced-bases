import { setIcon } from "obsidian";

// Shared "?" help control for every custom Bases view in this plugin.
//
// Bases renders its own toolbar (.bases-header > .bases-toolbar) ABOVE the
// container a view is given, and BasesView exposes no API to add a toolbar
// action — so we reach up from the view's container to that toolbar and inject
// a single help item. The injection is idempotent and meant to be called from
// each view's onDataUpdated(), so it re-appears if Bases re-renders the toolbar.

export interface ViewHelpContent {
  /** Short heading, e.g. the view name. */
  title: string;
  /** One line per control tip, e.g. "Ctrl+scroll to zoom". */
  lines: string[];
}

const HELP_BTN_CLASS = "advanced-bases-help-btn";
const HELP_POPOVER_CLASS = "advanced-bases-help-popover";

// Bases reuses the same toolbar DOM element when switching between our
// custom views within one leaf, so the button (and its click listener) is
// created once and reused across views. The listener must read whichever
// view's content is current at click time rather than closing over the
// getContent from whichever view happened to create the button first.
const currentContentByBtn = new WeakMap<HTMLElement, () => ViewHelpContent>();

function findToolbar(containerEl: HTMLElement): HTMLElement | null {
  const scope = containerEl.closest(".view-content") ?? containerEl.ownerDocument.body;
  return scope.querySelector<HTMLElement>(".bases-toolbar");
}

function closeAnyPopover(doc: Document): void {
  doc.querySelectorAll(`.${HELP_POPOVER_CLASS}`).forEach((el) => el.remove());
}

function openPopover(btn: HTMLElement, content: ViewHelpContent): void {
  const doc = btn.ownerDocument;
  closeAnyPopover(doc);

  const popover = doc.body.createDiv({ cls: HELP_POPOVER_CLASS });
  popover.createDiv({ cls: "advanced-bases-help-popover-title", text: content.title });
  const list = popover.createEl("ul", { cls: "advanced-bases-help-popover-list" });
  for (const line of content.lines) {
    list.createEl("li", { text: line });
  }

  // Position under the button, right-aligned to it, clamped to the viewport.
  const rect = btn.getBoundingClientRect();
  popover.style.visibility = "hidden";
  const pw = popover.offsetWidth;
  let left = rect.right - pw;
  if (left < 8) left = 8;
  const maxLeft = doc.documentElement.clientWidth - pw - 8;
  if (left > maxLeft) left = Math.max(8, maxLeft);
  popover.style.left = `${left}px`;
  popover.style.top = `${rect.bottom + 4}px`;
  popover.style.visibility = "";

  // Dismiss on outside click or Escape.
  const onDocClick = (evt: MouseEvent) => {
    if (!popover.contains(evt.target as Node) && evt.target !== btn && !btn.contains(evt.target as Node)) {
      cleanup();
    }
  };
  const onKey = (evt: KeyboardEvent) => {
    if (evt.key === "Escape") cleanup();
  };
  const cleanup = () => {
    popover.remove();
    doc.removeEventListener("mousedown", onDocClick, true);
    doc.removeEventListener("keydown", onKey, true);
  };
  // Defer so the opening click doesn't immediately close it.
  window.setTimeout(() => {
    doc.addEventListener("mousedown", onDocClick, true);
    doc.addEventListener("keydown", onKey, true);
  }, 0);
}

/**
 * Ensure a single "?" help item exists in the Bases toolbar for this view.
 * Idempotent: safe to call on every render. `getContent` is read lazily on
 * click so the popover always reflects the current locale.
 */
export function ensureViewHelpButton(
  containerEl: HTMLElement,
  ariaLabel: string,
  getContent: () => ViewHelpContent
): void {
  const toolbar = findToolbar(containerEl);
  if (!toolbar) return;

  let btn = toolbar.querySelector<HTMLElement>(`.${HELP_BTN_CLASS}`);
  if (!btn) {
    btn = toolbar.createDiv({ cls: `bases-toolbar-item clickable-icon ${HELP_BTN_CLASS}` });
    setIcon(btn, "circle-help");
    btn.setAttribute("tabindex", "0");
    btn.addEventListener("click", (evt) => {
      evt.stopPropagation();
      const existing = btn!.ownerDocument.querySelector(`.${HELP_POPOVER_CLASS}`);
      if (existing) {
        closeAnyPopover(btn!.ownerDocument);
      } else {
        const current = currentContentByBtn.get(btn!);
        if (current) openPopover(btn!, current());
      }
    });
  }
  // Refresh the accessible label and bound content each call, since the
  // button may be shared with a previously active view (see comment above).
  btn.setAttribute("aria-label", ariaLabel);
  currentContentByBtn.set(btn, getContent);
}
