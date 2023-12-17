import type { StorybookConfig } from "@storybook/preact-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/preact-vite",
  docs: {
    autodocs: "tag",
  },
 async viteFinal(config) {
   const mergedConfigs = mergeConfig(config, {
     base: "./",
   })

   return {
     ...mergedConfigs,
    plugins: mergedConfigs.plugins.filter((p: { name: string } | { name: string }[]) => ![
      'vite-plugin-electron-renderer',
      'vite-plugin-electron'
    ].some(plugin => Array.isArray(p) ? p.some(v => v.name === plugin) : plugin === p.name)),
   }
 }
}

export default config;
