import type { moment } from "obsidian";

// Moment instance type, derived from Obsidian's own bundled `moment` export
// rather than importing the "moment" package directly — moment ships with
// Obsidian itself, and importing it as a separate dependency would risk
// bundling/version duplication.
export type Moment = ReturnType<typeof moment>;
