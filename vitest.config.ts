import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: ["packages/*"],
    reporters: ["json"],
    coverage: {
      provider: "v8",
    },
  },
});
