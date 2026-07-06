import { App, Plugin, PluginSettingTab, Setting, normalizePath } from "obsidian";
import { getStrings } from "./i18n";

export interface AdvancedBasesSettings {
  feedViewNoteFolder: string;
  feedViewNoteTemplatePath: string;
  showNewNoteButton: boolean;
  todayMarkerColor: string;
}

// Empty string means "use the view's own theme-adaptive default color"
// (var(--text-normal)) rather than a fixed hex — see timelineView.ts.
export const DEFAULT_SETTINGS: AdvancedBasesSettings = {
  feedViewNoteFolder: "Škola/MUNI/Lekce",
  feedViewNoteTemplatePath: "-Template/Hodiny Template.md",
  showNewNoteButton: true,
  todayMarkerColor: "",
};

// Pre-release builds of denik-feed-view briefly used lessonFolder/lessonTemplatePath
// before the public "new note" rename; carry those over if present so nobody who
// tested an early build silently loses their configured paths.
interface LegacySettings {
  lessonFolder?: string;
  lessonTemplatePath?: string;
}

export function migrateSettings(
  loaded: Partial<AdvancedBasesSettings> & LegacySettings
): AdvancedBasesSettings {
  const migrated: Partial<AdvancedBasesSettings> = { ...loaded };
  if (migrated.feedViewNoteFolder === undefined && loaded.lessonFolder !== undefined) {
    migrated.feedViewNoteFolder = loaded.lessonFolder;
  }
  if (migrated.feedViewNoteTemplatePath === undefined && loaded.lessonTemplatePath !== undefined) {
    migrated.feedViewNoteTemplatePath = loaded.lessonTemplatePath;
  }
  delete (migrated as LegacySettings).lessonFolder;
  delete (migrated as LegacySettings).lessonTemplatePath;
  return Object.assign({}, DEFAULT_SETTINGS, migrated);
}

interface SettingsPlugin extends Plugin {
  settings: AdvancedBasesSettings;
  saveSettings(): Promise<void>;
}

export class AdvancedBasesSettingTab extends PluginSettingTab {
  constructor(app: App, private plugin: SettingsPlugin) {
    super(app, plugin);
  }

  // @ts-ignore: display() is deprecated in Obsidian 1.13.0, but we must use it to maintain compatibility with older Obsidian versions (minAppVersion is 1.10.0)
  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    const t = getStrings();

    containerEl.createEl("p", {
      text: t.settingsIntro,
      cls: "setting-item-description",
    });

    new Setting(containerEl).setName(t.settingsFeedHeading).setHeading();

    new Setting(containerEl)
      .setName(t.enableButtonName)
      .setDesc(t.enableButtonDesc)
      .addToggle((toggle) => {
        toggle.setValue(this.plugin.settings.showNewNoteButton).onChange(async (value) => {
          this.plugin.settings.showNewNoteButton = value;
          await this.plugin.saveSettings();
        });
      });

    new Setting(containerEl)
      .setName(t.folderName)
      .setDesc(t.folderDesc)
      .addText((text) => {
        text
          .setPlaceholder(DEFAULT_SETTINGS.feedViewNoteFolder)
          .setValue(this.plugin.settings.feedViewNoteFolder)
          .onChange(async (value) => {
            this.plugin.settings.feedViewNoteFolder = normalizePath(
              value.trim() || DEFAULT_SETTINGS.feedViewNoteFolder
            );
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName(t.templateName)
      .setDesc(t.templateDesc)
      .addText((text) => {
        text
          .setPlaceholder(DEFAULT_SETTINGS.feedViewNoteTemplatePath)
          .setValue(this.plugin.settings.feedViewNoteTemplatePath)
          .onChange(async (value) => {
            this.plugin.settings.feedViewNoteTemplatePath = normalizePath(
              value.trim() || DEFAULT_SETTINGS.feedViewNoteTemplatePath
            );
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl).setName(t.settingsCardsCompactHeading).setHeading();

    containerEl.createEl("p", {
      text: t.settingsCardsCompactDesc,
      cls: "setting-item-description",
    });

    new Setting(containerEl).setName(t.settingsTimelineHeading).setHeading();

    new Setting(containerEl)
      .setName(t.timelineTodayMarkerColorName)
      .setDesc(t.timelineTodayMarkerColorDesc)
      .addColorPicker((picker) => {
        picker
          .setValue(this.plugin.settings.todayMarkerColor || "#000000")
          .onChange(async (value) => {
            this.plugin.settings.todayMarkerColor = value;
            await this.plugin.saveSettings();
          });
      })
      .addExtraButton((button) => {
        button
          .setIcon("rotate-ccw")
          .setTooltip("Reset to theme default")
          .onClick(async () => {
            this.plugin.settings.todayMarkerColor = DEFAULT_SETTINGS.todayMarkerColor;
            await this.plugin.saveSettings();
            // @ts-ignore: Re-renders the settings tab when today's marker color is reset
            this.display();
          });
      });

  }
}
