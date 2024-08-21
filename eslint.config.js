import eslint from "@eslint/js";
import tselint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    files: ["./src/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: {
      ...eslint.configs.recommended.rules,
      ...tselint.configs.recommended,
      ...eslintConfigPrettier.rules,
    },
  },
];
