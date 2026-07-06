import {
  BasesEntry,
  BasesView,
  MarkdownRenderer,
  Notice,
  QueryController,
  RenderContext,
  TFile,
} from "obsidian";
import { createFeedViewNote } from "./feedViewNoteCreator";
import { getStrings } from "./i18n";
import { AdvancedBasesSettings } from "./settings";
import { ensureViewHelpButton } from "./viewHelp";

export const FEED_VIEW_TYPE = "feed";

const BODY_MAX_HEIGHT = 300;

interface CardBody {
  file: TFile;
  fadeEl: HTMLElement;
  showMoreEl: HTMLElement;
  mounted: boolean;
}

export class FeedView extends BasesView {
  readonly type = FEED_VIEW_TYPE;
  private listEl: HTMLElement;
  private observer: IntersectionObserver;
  private cardBodies = new WeakMap<HTMLElement, CardBody>();

  constructor(
    controller: QueryController,
    containerEl: HTMLElement,
    private getSettings: () => AdvancedBasesSettings
  ) {
    super(controller);
    containerEl.empty();
    containerEl.addClass("feed-view-container");

    if (this.getSettings().showNewNoteButton) {
      const toolbarEl = containerEl.createDiv({ cls: "feed-view-toolbar" });
      const newNoteButton = toolbarEl.createEl("button", {
        cls: "feed-view-new-note-button",
        text: getStrings().newNoteButton,
      });
      newNoteButton.addEventListener("click", () => {
        createFeedViewNote(this.app, this.config.name, this.getSettings()).catch((err) => {
          console.error("[advanced-bases] failed to create note", err);
          new Notice(getStrings().createFailed);
        });
      });
    }

    this.listEl = containerEl.createDiv({ cls: "feed-view-list" });

    this.observer = new IntersectionObserver(
      (observerEntries) => {
        for (const observerEntry of observerEntries) {
          const bodyEl = observerEntry.target as HTMLElement;
          if (observerEntry.isIntersecting) {
            void this.mountBody(bodyEl);
          } else {
            this.unmountBody(bodyEl);
          }
        }
      },
      { root: this.listEl, rootMargin: "400px 0px" }
    );

    this.register(() => this.observer.disconnect());
  }

  onDataUpdated(): void {
    const t = getStrings();
    ensureViewHelpButton(this.listEl, t.helpAria, () => ({
      title: "Feed",
      lines: [t.feedHelpLine1, t.feedHelpLine2],
    }));

    this.observer.disconnect();
    this.listEl.empty();
    for (const entry of this.data.data) {
      this.renderCard(entry);
    }
  }

  private renderCard(entry: BasesEntry): void {
    const cardEl = this.listEl.createDiv({ cls: "feed-view-card" });

    const titleEl = cardEl.createDiv({
      cls: "feed-view-card-title",
      text: entry.file.basename,
    });
    titleEl.addEventListener("click", () => {
      this.app.workspace.getLeaf(false).openFile(entry.file);
    });

    if (this.config.get("showProperties") !== false) {
      this.renderProperties(cardEl, entry);
    }

    const bodyWrapEl = cardEl.createDiv({ cls: "feed-view-card-body-wrap" });
    const bodyEl = bodyWrapEl.createDiv({ cls: "feed-view-card-body" });
    const fadeEl = bodyWrapEl.createDiv({ cls: "feed-view-card-fade is-hidden" });
    const showMoreEl = bodyWrapEl.createEl("button", {
      cls: "feed-view-card-show-more is-hidden",
      text: getStrings().showMore,
    });
    showMoreEl.addEventListener("click", () => {
      bodyWrapEl.addClass("feed-view-card-body-wrap-expanded");
      fadeEl.addClass("is-hidden");
      showMoreEl.addClass("is-hidden");
    });

    this.cardBodies.set(bodyEl, { file: entry.file, fadeEl, showMoreEl, mounted: false });
    this.observer.observe(bodyEl);
  }

  private renderProperties(cardEl: HTMLElement, entry: BasesEntry): void {
    const order = this.config.getOrder();
    if (order.length === 0) return;

    const rowEl = cardEl.createDiv({ cls: "feed-view-card-properties" });
    const ctx = new RenderContext();
    for (const propId of order) {
      const value = entry.getValue(propId);
      if (value === null) continue;
      const propEl = rowEl.createDiv({ cls: "feed-view-card-property" });
      propEl.createSpan({
        cls: "feed-view-card-property-name",
        text: this.config.getDisplayName(propId) + ": ",
      });
      const valueEl = propEl.createSpan({ cls: "feed-view-card-property-value" });
      value.renderTo(valueEl, ctx);
    }
  }

  private async mountBody(bodyEl: HTMLElement): Promise<void> {
    const card = this.cardBodies.get(bodyEl);
    if (!card || card.mounted) return;
    card.mounted = true;

    try {
      const raw = await this.app.vault.cachedRead(card.file);
      const withoutFrontmatter = raw.replace(/^---\n[\s\S]*?\n---\n/, "");
      bodyEl.empty();
      await MarkdownRenderer.render(this.app, withoutFrontmatter, bodyEl, card.file.path, this);

      if (bodyEl.scrollHeight > BODY_MAX_HEIGHT) {
        card.fadeEl.removeClass("is-hidden");
        card.showMoreEl.removeClass("is-hidden");
      }
    } catch (err) {
      console.error("[advanced-bases] failed to render card body", card.file.path, err);
      bodyEl.setText(getStrings().previewFailed);
    }
  }

  private unmountBody(bodyEl: HTMLElement): void {
    const card = this.cardBodies.get(bodyEl);
    if (!card || !card.mounted) return;
    card.mounted = false;
    bodyEl.empty();
  }
}
