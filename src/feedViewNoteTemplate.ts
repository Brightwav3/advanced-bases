import type { Moment } from "./momentType";

export function renderFeedViewNoteTemplate(raw: string, title: string, now: Moment): string {
  let out = raw;
  out = out.replace(/\{\{\s*title\s*\}\}/gi, title);
  out = out.replace(/\{\{\s*date\s*:([^}]*)\}\}/gi, (_match, fmt: string) => now.format(fmt));
  out = out.replace(/\{\{\s*time\s*:([^}]*)\}\}/gi, (_match, fmt: string) => now.format(fmt));
  out = out.replace(/\{\{\s*date\s*\}\}/gi, now.format("YYYY-MM-DD"));
  out = out.replace(/\{\{\s*time\s*\}\}/gi, now.format("HH:mm"));
  return out;
}

export function buildFeedViewNoteBasename(now: Moment, baseName: string): string {
  return `${now.format("YYYY. M. D")} – ${baseName}`;
}

export function buildFeedViewNotePath(folder: string, basename: string): string {
  const cleanFolder = folder.replace(/\/+$/, "");
  return `${cleanFolder}/${basename}.md`;
}

export function buildBaseWikilink(baseName: string): string {
  return `[[${baseName}]]`;
}
