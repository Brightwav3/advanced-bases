import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      obsidian: path.resolve(__dirname, "test/obsidianMock.ts"),
    },
  },
});
