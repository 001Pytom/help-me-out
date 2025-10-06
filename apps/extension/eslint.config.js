// import { nextJsConfig } from "@repo/eslint-config/next-js";

// /** @type {import("eslint").Linter.Config} */

// export default nextJsConfig;

// apps/extension/eslint.config.js

import js from "@eslint/js";
import react from "@eslint-react";

export default [
  js.configs.recommended,
  react.configs.recommended,
  {
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
];
