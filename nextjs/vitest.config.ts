/// <reference types="vitest" />

import { resolve } from "node:path";

import react from "@vitejs/plugin-react";

import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./"),
    },
  },
  plugins: [
    react(),
  ],
  test: {
    environment: "jsdom",
  },
});
