import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      complexity: ["warn", { max: 15 }]
    }
  },
  {
    files: ["tests/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      }
    }
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser }
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        process: "readonly"
      }
    }
  },
  {
    ignores: [
      "node_modules/",
      "coverage/",
      "tests/",
      "src/database/migrations/",
      "src/models/",
      "src/config/sequelize.js",
      "src/config/database.js"
    ]
  }
]);
