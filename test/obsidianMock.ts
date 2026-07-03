// Minimal stub for the "obsidian" module during unit tests. The real
// "obsidian" package ships type declarations only (no runtime JS — see its
// package.json "main": "") since the actual implementation is injected by
// the running Obsidian app. Production code imports real Obsidian APIs
// (getLanguage, moment, etc.) as recommended by the plugin guidelines;
// this stub lets Vitest resolve those imports for modules that are pulled
// into the test graph but never actually invoke them during a test run.

export function getLanguage(): string {
  return "en";
}
