import { defineConfig } from "@onyxjs/core";

export default defineConfig({
  testDir: "test",
  timeoutMs: 5000,
  bail: false,
  includes: ["**/*.spec.ts"],
  excludes: ["**/node_modules/**", "**/dist/**"],
});
