/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { alias } from './vite.config.mts'
import preact from "@preact/preset-vite";

export default defineConfig({
    plugins: [
        preact({
            babel: {
              configFile: true,
            }
          }),
    ],
  test: {
    include: ['src/react/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    globals: true,
    alias,
    environment: 'jsdom'
  },
})