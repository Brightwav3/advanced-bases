import { BasesAllOptions, Plugin } from "obsidian";
import { COMPACT_CARDS_VIEW_TYPE, CompactCardsView } from "./compactCardsView";
import { FEED_VIEW_TYPE, FeedView } from "./feedView";
import { TIMELINE_VIEW_TYPE, TimelineView } from "./timelineView";
import { getStrings } from "./i18n";
import {
  AdvancedBasesSettingTab,
  AdvancedBasesSettings,
  migrateSettings,
} from "./settings";

export default class AdvancedBasesPlugin extends Plugin {
  settings!: AdvancedBasesSettings;

  async onload(): Promise<void> {
    await this.loadSettings();
    this.addSettingTab(new AdvancedBasesSettingTab(this.app, this));

    this.registerBasesView(FEED_VIEW_TYPE, {
      name: "Feed",
      icon: "rss",
      factory: (controller, containerEl) =>
        new FeedView(controller, containerEl, () => this.settings),
      options: () => {
        const t = getStrings();
        return [
          {
            type: "toggle",
            key: "showProperties",
            displayName: t.showPropertiesName,
            default: true,
          },
        ];
      },
    });

    this.registerBasesView(COMPACT_CARDS_VIEW_TYPE, {
      name: "Cards Compact",
      icon: "gallery-vertical-end",
      factory: (controller, containerEl) => new CompactCardsView(controller, containerEl),
      options: (config) => {
        const t = getStrings();
        const options: BasesAllOptions[] = [
          {
            type: "property",
            key: "imageProperty",
            displayName: t.imagePropertyName,
          },
          {
            type: "dropdown",
            key: "imageFit",
            displayName: t.imageFitName,
            default: "cover",
            options: {
              cover: t.imageFitCoverLabel,
              contain: t.imageFitContainLabel,
            },
          },
          {
            type: "slider",
            key: "imageAspectRatio",
            displayName: t.aspectRatioName,
            default: 1,
            min: 0.5,
            max: 2,
            step: 0.05,
          },
          {
            type: "slider",
            key: "cardSize",
            displayName: t.cardWidthName,
            default: 200,
            min: 120,
            max: 400,
            step: 20,
          },
          {
            type: "toggle",
            key: "compact",
            displayName: t.compactToggleName,
            default: false,
          },
          {
            type: "group",
            displayName: t.compactCardSettingsGroupName,
            shouldHide: () => config.get("compact") !== true,
            items: [
              {
                type: "toggle",
                key: "showIcon",
                displayName: t.showIconName,
                default: true,
              },
            ],
          },
        ];
        return options;
      },
    });

    this.registerBasesView(TIMELINE_VIEW_TYPE, {
      name: "Timeline",
      icon: "gantt-chart",
      factory: (controller, containerEl) =>
        new TimelineView(controller, containerEl, () => this.settings),
      options: () => {
        const t = getStrings();
        return [
          {
            type: "property",
            key: "dateProperty",
            displayName: t.timelineDatePropertyName,
          },
          {
            type: "property",
            key: "endDateProperty",
            displayName: t.timelineEndDatePropertyName,
          },
          {
            type: "property",
            key: "groupProperty",
            displayName: t.timelineGroupPropertyName,
          },
          {
            type: "slider",
            key: "laneHeight",
            displayName: t.timelineLaneHeightName,
            default: 48,
            min: 32,
            max: 120,
            step: 4,
          },
        ];
      },
    });

  }

  async loadSettings(): Promise<void> {
    const loadedData = (await this.loadData()) as Record<string, unknown> | null;
    this.settings = migrateSettings(loadedData || {});
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }
}
