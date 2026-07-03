# Advanced Bases

Three focused, Notion-style views for [Obsidian Bases](https://help.obsidian.md/bases): **Cards Compact**, **Feed**, and **Timeline**. A lightweight companion to Obsidian's native Bases views.

## Views

### Cards Compact

A sibling to Obsidian's native Cards view that adds a **Compact** toggle:

- **Normal mode** — a cover image plus labeled property rows, matching the look of native Cards.
- **Compact mode** — a lean row with an optional cover, a file-type icon, the title, and property values shown as small inline pills.
- Configurable cover image property, image fit (cover/contain), aspect ratio, and card width.

### Feed

A vertically scrolling feed of full note previews, rendered as Markdown:

- Notes lazy-render as they scroll into view and unmount when they scroll out, so large Bases stay smooth.
- Long notes truncate with a fade and a "Show more" expander.
- An optional **New note** toolbar button creates a note in a configured folder from a configured template, linked back to the current Base.
- Configure which properties are shown above each note's preview.

### Timeline

A Gantt-style timeline for date-bearing notes:

- Notes plot as bars (start → end date) or single markers (no end date) on horizontal lanes.
- Lanes are grouped by any property, each auto-assigned a color from a fixed palette — click a lane's color swatch to override it.
- `Ctrl`+scroll (or pinch) to zoom, plain scroll to pan; a vertical marker highlights today's date.
- Falls back to a note's creation date when no date property is set, so every note always has a place on the timeline.

### Built-in help

Every view has a small **?** icon in the Bases toolbar with a quick reference for that view's controls.

## Installation

### Manual

1. Download `main.js`, `manifest.json`, and `styles.css` from the [latest release](../../releases/latest).
2. Create a folder named `advanced-bases` inside your vault's `.obsidian/plugins/` directory and place the three files there.
3. Reload Obsidian (or disable/re-enable Community Plugins) and enable **Advanced Bases** in Settings → Community plugins.

### Community Plugins browser

Once accepted into Obsidian's community plugin directory, you'll be able to search for **Advanced Bases** directly in Settings → Community plugins → Browse.

## Usage

Open any `.base` file, use the layout picker in the Bases toolbar, and choose **Cards Compact**, **Feed**, or **Timeline**. Each view's configuration (date properties, image properties, lane grouping, etc.) is set per-view from the same toolbar, the same way you'd configure any native Bases view.

Plugin-wide settings — the Feed view's new-note folder/template and the Timeline's today-marker color — are under Settings → Advanced Bases.

## Development

```bash
npm install
npm run dev        # esbuild watch mode
npm run build       # production build
npm run typecheck   # tsc --noEmit
npm test             # vitest
```

The plugin is plain TypeScript bundled with esbuild (CommonJS, no framework), tested with Vitest, and localized into 15 languages (`src/i18n.ts`).

### Project layout

```
src/
  main.ts                 plugin entry point, registers the three views
  compactCardsView.ts      Cards Compact view
  feedView.ts              Feed view
  timelineView.ts          Timeline view (+ timelineAxis.ts, timelineLayout.ts)
  shared/groupColor.ts      shared per-group color palette + overrides
  settings.ts               plugin settings tab
  i18n.ts                   15-locale string tables
  viewHelp.ts                shared "?" toolbar help control
```

## License

[MIT](LICENSE)
