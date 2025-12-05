import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import i18nextPlugin from "eslint-plugin-i18next"; // Added import

export default tseslint.config(
  { ignores: ["dist"] },
  js.configs.recommended, // Adjusted extends
  ...tseslint.configs.recommended, // Adjusted extends
  { // Added i18next plugin configuration
    plugins: {
      i18next: i18nextPlugin,
    },
    rules: {
      ...i18nextPlugin.configs.recommended.rules,
      "i18next/no-literal-string": [
        "error",
        {
          "markupOnly": false, // Ensure it checks all strings, not just JSX
          "ignorePattern": "^[0-9:./-]+$",
          "ignoreAttribute": ["aria-hidden"], // Added to ignore aria-hidden="true"
        },
      ],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    files: ["scripts/**/*.{js,cjs,mjs}", "tailwind.config.ts", "*.config.js", "*.config.cjs"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      sourceType: 'module',
    },
    rules: {
      "i18next/no-literal-string": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
      "no-console": "off",
    },
  },
);
