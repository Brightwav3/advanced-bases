import { App, Notice, TFile, TFolder, moment, normalizePath } from "obsidian";
import type { Moment } from "./momentType";
import { format, getStrings } from "./i18n";
import {
  buildBaseWikilink,
  buildFeedViewNoteBasename,
  buildFeedViewNotePath,
  renderFeedViewNoteTemplate,
} from "./feedViewNoteTemplate";
import { DEFAULT_SETTINGS, AdvancedBasesSettings } from "./settings";

function settingPath(value: string, fallback: string): string {
  return normalizePath(value.trim() || fallback);
}

async function ensureFolder(app: App, path: string): Promise<TFolder> {
  const normalizedPath = normalizePath(path);
  const exact = app.vault.getAbstractFileByPath(normalizedPath);
  if (exact instanceof TFolder) return exact;

  const lowerPath = normalizedPath.toLocaleLowerCase();
  const existing = app.vault
    .getAllLoadedFiles()
    .find((file) => file instanceof TFolder && file.path.toLocaleLowerCase() === lowerPath);

  if (existing instanceof TFolder) return existing;

  await app.vault.createFolder(normalizedPath);
  const created = app.vault.getAbstractFileByPath(normalizedPath);
  if (created instanceof TFolder) return created;

  throw new Error(`Failed to create folder: ${normalizedPath}`);
}

export async function createFeedViewNote(
  app: App,
  baseName: string,
  settings: AdvancedBasesSettings
): Promise<void> {
  const t = getStrings();
  const templatePath = settingPath(
    settings.feedViewNoteTemplatePath,
    DEFAULT_SETTINGS.feedViewNoteTemplatePath
  );
  const noteFolder = settingPath(settings.feedViewNoteFolder, DEFAULT_SETTINGS.feedViewNoteFolder);

  const templateFile = app.vault.getAbstractFileByPath(templatePath);
  if (!(templateFile instanceof TFile)) {
    new Notice(format(t.templateMissing, { path: templatePath }));
    return;
  }

  const now: Moment = moment();
  const basename = buildFeedViewNoteBasename(now, baseName);
  const folder = await ensureFolder(app, noteFolder);
  const path = normalizePath(buildFeedViewNotePath(folder.path, basename));

  if (app.vault.getAbstractFileByPath(path)) {
    new Notice(format(t.noteExists, { path }));
    return;
  }

  const rawTemplate = await app.vault.cachedRead(templateFile);
  const rendered = renderFeedViewNoteTemplate(rawTemplate, basename, now);
  const file = await app.vault.create(path, rendered);

  const baseFile = app.vault.getAbstractFileByPath(`${baseName}.md`);
  await app.fileManager.processFrontMatter(file, (fm: Record<string, unknown>) => {
    fm.kurz =
      baseFile instanceof TFile
        ? app.fileManager.generateMarkdownLink(baseFile, file.path)
        : buildBaseWikilink(baseName);
  });

  await app.workspace.getLeaf(false).openFile(file);
}
