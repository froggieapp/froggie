/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { alias } from './vite.config.mts'

export default defineConfig({
  test: {
    include: ['src/electron/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    globals: true,
    alias,
  },
})