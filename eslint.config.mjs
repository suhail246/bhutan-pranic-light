import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "standard",
      "plugin:tailwindcss/recommended",
      "plugin:import/recommended",
      "prettier",
    ],
    plugins: ["import", "unused-imports"],
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Built-in types are first
            "external", // External libraries
            "internal", // Internal modules
            ["parent", "sibling"], // Parent and sibling types can be mingled together
            "index", // Then the index file
            "object", // Object imports
          ],
          "newlines-between": "always",
          pathGroups: [
            {
              pattern: "@app/**",
              group: "external",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
    ignorePatterns: ["components/ui/**"],
    overrides: [
      {
        files: ["*.js", "*.jsx"],
        rules: {
          "no-undef": "off",
        },
      },
    ],
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        alias: {
          map: [["@app", "./src/app"]],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  }),
];

export default eslintConfig;
