import globals from "globals";
import js from "@eslint/js";
import tsEslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default tsEslint.config(
  {
    ignores: ["node_modules", "!.*", "**/dist", "**/build"],
  },

  {
    extends: [js.configs.recommended, ...tsEslint.configs.recommended],
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.node },
  },

  {
    files: ["packages/**/**/*.{js,ts}"],
    languageOptions: { globals: globals.browser },
  },

  eslintPluginPrettierRecommended,
);
