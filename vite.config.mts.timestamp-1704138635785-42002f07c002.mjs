// vite.config.mts
import { rmSync } from "node:fs";
import { defineConfig } from "file:///C:/Users/user/Documents/GitHub/Kickerino/node_modules/vite/dist/node/index.js";
import electron from "file:///C:/Users/user/Documents/GitHub/Kickerino/node_modules/vite-plugin-electron/dist/index.mjs";

// package.json
var package_default = {
  name: "froggie",
  version: "0.2.18",
  description: "A chat application",
  main: "./build/electron/electron.js",
  homepage: "https://github.com/froggieapp/froggie",
  author: {
    name: "vicodinee"
  },
  build: {
    asar: true,
    productName: "froggie",
    files: [
      "build/**/*",
      "!node_modules"
    ],
    appId: "com.froggie.app",
    mac: {
      category: "public.app-category.social-networking",
      artifactName: "${productName}-${version}-${os}-${arch}.${ext}"
    },
    win: {
      target: "nsis",
      artifactName: "${productName}-${version}-${os}-${arch}.${ext}"
    },
    linux: {
      target: "AppImage",
      artifactName: "${productName}-${version}-${os}-${arch}.${ext}",
      category: "Network"
    },
    publish: {
      provider: "github",
      repo: "froggie",
      owner: "froggieapp",
      releaseType: "release"
    }
  },
  scripts: {
    build: "yarn vite build",
    "build:local": "yarn vite build && yarn app:dist",
    dev: "vite",
    "test:electron": "vitest run --config ./vitest.electron.config.ts",
    "test:react": "vitest run --config ./vitest.react.config.ts",
    "lint:style": 'stylelint --fix "**/*.css" --ignore-path .gitignore',
    "lint:fix": "yarn eslint src --fix",
    "prettier:fix": "yarn prettier src --check --write",
    format: "yarn lint:style && yarn prettier:fix && yarn lint:fix",
    test: "yarn tsc --noEmit && yarn test:electron && yarn test:react",
    "app:dir": "yarn electron-builder --dir",
    "app:dist": "yarn electron-builder",
    storybook: "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "get-changelog": "node ./getChangelog.mjs",
    e2e: "yarn playwright test"
  },
  devDependencies: {
    "@babel/core": "^7.23.6",
    "@babel/plugin-transform-react-jsx-source": "^7.23.3",
    "@babel/preset-env": "^7.23.3",
    "@babel/preset-react": "^7.23.3",
    "@babel/preset-typescript": "^7.23.3",
    "@octokit/rest": "^20.0.2",
    "@originjs/vite-plugin-commonjs": "^1.0.3",
    "@playwright/test": "^1.40.1",
    "@preact/preset-vite": "^2.7.0",
    "@storybook/addon-essentials": "^7.6.4",
    "@storybook/addon-interactions": "^7.6.4",
    "@storybook/addon-links": "^7.6.4",
    "@storybook/addon-onboarding": "^1.0.10",
    "@storybook/blocks": "^7.6.4",
    "@storybook/preact-vite": "^7.6.5",
    "@storybook/react": "^7.6.4",
    "@storybook/test": "^7.6.4",
    "@testing-library/preact": "^3.2.3",
    "@types/babel__core": "^7",
    "@types/jest": "^29.5.11",
    "@types/micromodal": "^0.3.5",
    "@types/node": "^20.10.6",
    "@types/postcss-reporter": "^7",
    "@types/react": "^17",
    "@types/react-dom": "^17",
    "@types/rollup-plugin-postcss": "^3.1.4",
    "@typescript-eslint/eslint-plugin": "^6.13.0",
    "@typescript-eslint/parser": "^6.13.0",
    "@welldone-software/why-did-you-render": "^7.0.1",
    autoprefixer: "^10.4.16",
    "babel-jest": "^29.7.0",
    doiuse: "^6.0.2",
    electron: "^28.0.0",
    "electron-builder": "^24.9.1",
    "electron-playwright-helpers": "^1.7.0",
    eslint: "^8.56.0",
    "eslint-config-preact": "^1.3.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-jest": "^27.6.0",
    "eslint-plugin-prettier": "^5.0.1",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-perf": "^3.3.1",
    "eslint-plugin-storybook": "^0.6.15",
    jest: "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "jest-websocket-mock": "^2.5.0",
    jsdom: "^23.0.1",
    "node-fetch": "^3.3.2",
    "postcss-bem-linter": "^4.0.1",
    "postcss-nested": "^6.0.1",
    "postcss-reporter": "^7.0.5",
    prettier: "3.1.0",
    "react-devtools": "^5.0.0",
    storybook: "^7.6.4",
    stylelint: "^16.1.0",
    "stylelint-config-recommended": "^14.0.0",
    "tsconfig-paths": "^4.2.0",
    typescript: "^5.3.3",
    vite: "^5.0.4",
    "vite-plugin-electron": "^0.15.4",
    "vite-plugin-electron-renderer": "^0.14.5",
    vitest: "^1.1.0"
  },
  dependencies: {
    "@capsizecss/core": "^3.1.1",
    "@capsizecss/metrics": "^1.2.0",
    "@emoji-mart/data": "^1.1.2",
    "@heroicons/react": "^2.0.18",
    "@lexical/react": "^0.12.5",
    "@lexical/utils": "^0.12.5",
    "@tabler/icons-react": "^2.44.0",
    "@tanstack/react-query": "^5.12.2",
    dayjs: "^1.11.10",
    debounce: "^2.0.0",
    "fastest-levenshtein": "^1.0.16",
    immer: "^10.0.3",
    lexical: "^0.12.5",
    micromodal: "^0.4.10",
    preact: "^10.19.3",
    react: "npm:@preact/compat@*",
    "react-dom": "npm:@preact/compat@*",
    "react-easy-emoji": "^1.8.1",
    "react-icons": "^4.12.0",
    "react-toastify": "^9.1.3",
    "react-tooltip": "^5.25.0",
    "react-use-draggable-scroll": "^0.4.7",
    "react-virtuoso": "^4.6.2",
    "twemoji-react-assets": "https://github.com/froggieapp/twemoji-react-assets.git",
    "wouter-preact": "^2.12.2",
    zustand: "^4.4.6"
  },
  packageManager: "yarn@4.0.2",
  resolutions: {
    react: "npm:@preact/compat@*",
    "react-dom": "npm:@preact/compat@*"
  }
};

// vite.config.mts
import path from "path";
import { JSDOM } from "file:///C:/Users/user/Documents/GitHub/Kickerino/node_modules/jsdom/lib/api.js";
import child from "child_process";
import preact from "file:///C:/Users/user/Documents/GitHub/Kickerino/node_modules/@preact/preset-vite/dist/esm/index.mjs";
import { esbuildCommonjs, viteCommonjs } from "file:///C:/Users/user/Documents/GitHub/Kickerino/node_modules/@originjs/vite-plugin-commonjs/lib/index.js";
var __vite_injected_original_dirname = "C:\\Users\\user\\Documents\\GitHub\\Kickerino";
var alias = {
  "@": path.resolve(__vite_injected_original_dirname, "./src"),
  "src": path.resolve(__vite_injected_original_dirname, "./src/react"),
  "@electron": path.resolve(__vite_injected_original_dirname, "./src/electron"),
  "@styles": path.resolve(__vite_injected_original_dirname, "./src/react/styles"),
  "@shared": path.resolve(__vite_injected_original_dirname, "./src/react/shared"),
  "@FroggieTypes": path.resolve(__vite_injected_original_dirname, "./types"),
  "react": "preact/compat",
  "react-dom/test-utils": "preact/test-utils",
  "react-dom": "preact/compat",
  "react/jsx-runtime": "preact/jsx-runtime"
};
var addReactDevToolsScriptPlugin = () => ({
  name: "add-react-devtools-script",
  apply: "serve",
  transformIndexHtml(html) {
    const jsdom = new JSDOM(html);
    const script = jsdom.window.document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://localhost:8097";
    jsdom.window.document.head.appendChild(script);
    return jsdom.serialize();
  }
});
var vite_config_default = defineConfig(({ command, mode }) => {
  rmSync("dist", { recursive: true, force: true });
  const isDev = mode === "development";
  const isBuild = command === "build";
  const sourcemap = true;
  console.log("Vite build", mode, command);
  if (isDev) {
    child.exec("npx react-devtools");
  }
  return {
    base: "",
    resolve: {
      alias
    },
    build: {
      sourcemap: true,
      outDir: "./build"
    },
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          esbuildCommonjs(["@capsizecss/metrics"])
        ]
      }
    },
    plugins: [
      isDev && addReactDevToolsScriptPlugin(),
      viteCommonjs(),
      preact({
        babel: {
          configFile: true
        }
      }),
      electron([
        {
          entry: "src/electron/electron.ts",
          onstart(options) {
            options.startup();
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: "build/electron",
              rollupOptions: {
                external: Object.keys("dependencies" in package_default ? package_default.dependencies : {})
              }
            },
            resolve: {
              alias
            }
          }
        },
        {
          entry: "src/electron/preload.ts",
          onstart(args) {
            args.reload();
          },
          vite: {
            build: {
              sourcemap: sourcemap ? "inline" : void 0,
              // #332
              minify: isBuild,
              outDir: "build",
              rollupOptions: {
                external: Object.keys("dependencies" in package_default ? package_default.dependencies : {})
              }
            },
            resolve: {
              alias
            }
          }
        }
      ])
    ],
    server: {
      port: 3e3
    },
    clearScreen: false
  };
});
export {
  alias,
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIiwgInBhY2thZ2UuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFxLaWNrZXJpbm9cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFxLaWNrZXJpbm9cXFxcdml0ZS5jb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy91c2VyL0RvY3VtZW50cy9HaXRIdWIvS2lja2VyaW5vL3ZpdGUuY29uZmlnLm10c1wiO2ltcG9ydCB7IHJtU3luYyB9IGZyb20gJ25vZGU6ZnMnXHJcbmltcG9ydCB7IENvbmZpZ0VudiwgUGx1Z2luLCBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgZWxlY3Ryb24gZnJvbSAndml0ZS1wbHVnaW4tZWxlY3Ryb24nXHJcbmltcG9ydCBwa2cgZnJvbSAnLi9wYWNrYWdlLmpzb24nXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcbmltcG9ydCB7IEpTRE9NIH0gZnJvbSAnanNkb20nXHJcbmltcG9ydCBjaGlsZCBmcm9tICdjaGlsZF9wcm9jZXNzJ1xyXG5pbXBvcnQgcHJlYWN0IGZyb20gXCJAcHJlYWN0L3ByZXNldC12aXRlXCI7XHJcbmltcG9ydCB7IGVzYnVpbGRDb21tb25qcywgdml0ZUNvbW1vbmpzIH0gZnJvbSAnQG9yaWdpbmpzL3ZpdGUtcGx1Z2luLWNvbW1vbmpzJ1xyXG5cclxuZXhwb3J0IGNvbnN0IGFsaWFzID0gIHtcclxuICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxyXG4gIFwic3JjXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvcmVhY3RcIiksXHJcbiAgXCJAZWxlY3Ryb25cIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9lbGVjdHJvblwiKSxcclxuICBcIkBzdHlsZXNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9yZWFjdC9zdHlsZXNcIiksXHJcbiAgXCJAc2hhcmVkXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvcmVhY3Qvc2hhcmVkXCIpLFxyXG4gIFwiQEZyb2dnaWVUeXBlc1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vdHlwZXNcIiksXHJcbiAgXCJyZWFjdFwiOiBcInByZWFjdC9jb21wYXRcIixcclxuICBcInJlYWN0LWRvbS90ZXN0LXV0aWxzXCI6IFwicHJlYWN0L3Rlc3QtdXRpbHNcIixcclxuICBcInJlYWN0LWRvbVwiOiBcInByZWFjdC9jb21wYXRcIixcclxuICBcInJlYWN0L2pzeC1ydW50aW1lXCI6IFwicHJlYWN0L2pzeC1ydW50aW1lXCJcclxufVxyXG5cclxuY29uc3QgYWRkUmVhY3REZXZUb29sc1NjcmlwdFBsdWdpbiA9ICgpID0+ICh7XHJcbiAgbmFtZTogJ2FkZC1yZWFjdC1kZXZ0b29scy1zY3JpcHQnLFxyXG4gIGFwcGx5OiAnc2VydmUnLFxyXG4gIHRyYW5zZm9ybUluZGV4SHRtbChodG1sKSB7XHJcbiAgICBjb25zdCBqc2RvbSA9IG5ldyBKU0RPTShodG1sKTtcclxuICAgIGNvbnN0IHNjcmlwdCA9IGpzZG9tLndpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxyXG4gICAgc2NyaXB0LnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiXHJcbiAgICBzY3JpcHQuc3JjID0gXCJodHRwOi8vbG9jYWxob3N0OjgwOTdcIlxyXG4gICAganNkb20ud2luZG93LmRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KVxyXG4gICAgcmV0dXJuIGpzZG9tLnNlcmlhbGl6ZSgpIFxyXG4gIH0sXHJcbn0gYXMgUGx1Z2luKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfTogQ29uZmlnRW52KSA9PiB7XHJcbiAgcm1TeW5jKCdkaXN0JywgeyByZWN1cnNpdmU6IHRydWUsIGZvcmNlOiB0cnVlIH0pXHJcblxyXG4gIGNvbnN0IGlzRGV2ID0gbW9kZSA9PT0gJ2RldmVsb3BtZW50J1xyXG4gIGNvbnN0IGlzQnVpbGQgPSBjb21tYW5kID09PSAnYnVpbGQnXHJcbiAgY29uc3Qgc291cmNlbWFwID0gdHJ1ZVxyXG5cclxuICBjb25zb2xlLmxvZygnVml0ZSBidWlsZCcsIG1vZGUsIGNvbW1hbmQpXHJcblxyXG4gIGlmIChpc0Rldikge1xyXG4gICAgY2hpbGQuZXhlYygnbnB4IHJlYWN0LWRldnRvb2xzJylcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBiYXNlOiAnJyxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgICBhbGlhczogYWxpYXMsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgc291cmNlbWFwOiB0cnVlLFxyXG4gICAgICAgIG91dERpcjogJy4vYnVpbGQnLFxyXG4gICAgICB9LFxyXG4gICAgICBvcHRpbWl6ZURlcHM6IHtcclxuICAgICAgICBlc2J1aWxkT3B0aW9uczoge1xyXG4gICAgICAgICAgcGx1Z2luczpbXHJcbiAgICAgICAgICAgIGVzYnVpbGRDb21tb25qcyhbJ0BjYXBzaXplY3NzL21ldHJpY3MnXSkgXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICBpc0RldiAmJiBhZGRSZWFjdERldlRvb2xzU2NyaXB0UGx1Z2luKCksXHJcbiAgICAgIHZpdGVDb21tb25qcygpLFxyXG4gICAgICBwcmVhY3Qoe1xyXG4gICAgICAgIGJhYmVsOiB7XHJcbiAgICAgICAgICBjb25maWdGaWxlOiB0cnVlLFxyXG4gICAgICAgIH1cclxuICAgICAgfSksXHJcbiAgICAgIGVsZWN0cm9uKFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBlbnRyeTogJ3NyYy9lbGVjdHJvbi9lbGVjdHJvbi50cycsXHJcbiAgICAgICAgICBvbnN0YXJ0KG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5zdGFydHVwKClcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB2aXRlOiB7XHJcbiAgICAgICAgICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgICAgICAgc291cmNlbWFwLFxyXG4gICAgICAgICAgICAgIG1pbmlmeTogaXNCdWlsZCxcclxuICAgICAgICAgICAgICBvdXREaXI6ICdidWlsZC9lbGVjdHJvbicsXHJcbiAgICAgICAgICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgZXh0ZXJuYWw6IE9iamVjdC5rZXlzKCdkZXBlbmRlbmNpZXMnIGluIHBrZyA/IHBrZy5kZXBlbmRlbmNpZXMgOiB7fSksXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgYWxpYXM6IGFsaWFzLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZW50cnk6ICdzcmMvZWxlY3Ryb24vcHJlbG9hZC50cycsXHJcbiAgICAgICAgICBvbnN0YXJ0KGFyZ3MpIHtcclxuICAgICAgICAgICAgLy8gTm90aWZ5IHRoZSBSZW5kZXJlciBwcm9jZXNzIHRvIHJlbG9hZCB0aGUgcGFnZSB3aGVuIHRoZSBQcmVsb2FkIHNjcmlwdHMgYnVpbGQgaXMgY29tcGxldGUsIFxyXG4gICAgICAgICAgICAvLyBpbnN0ZWFkIG9mIHJlc3RhcnRpbmcgdGhlIGVudGlyZSBFbGVjdHJvbiBBcHAuXHJcbiAgICAgICAgICAgIGFyZ3MucmVsb2FkKClcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB2aXRlOiB7XHJcbiAgICAgICAgICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgICAgICAgc291cmNlbWFwOiBzb3VyY2VtYXAgPyAnaW5saW5lJyA6IHVuZGVmaW5lZCwgLy8gIzMzMlxyXG4gICAgICAgICAgICAgIG1pbmlmeTogaXNCdWlsZCxcclxuICAgICAgICAgICAgICBvdXREaXI6ICdidWlsZCcsXHJcbiAgICAgICAgICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgZXh0ZXJuYWw6IE9iamVjdC5rZXlzKCdkZXBlbmRlbmNpZXMnIGluIHBrZyA/IHBrZy5kZXBlbmRlbmNpZXMgOiB7fSksXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgYWxpYXM6IGFsaWFzLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgICAgXSksXHJcbiAgICBdLFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgICAgcG9ydDogMzAwMCxcclxuICAgIH0sXHJcbiAgICBjbGVhclNjcmVlbjogZmFsc2UsXHJcbiAgfVxyXG59KSIsICJ7XG4gIFwibmFtZVwiOiBcImZyb2dnaWVcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4yLjE4XCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJBIGNoYXQgYXBwbGljYXRpb25cIixcbiAgXCJtYWluXCI6IFwiLi9idWlsZC9lbGVjdHJvbi9lbGVjdHJvbi5qc1wiLFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2Zyb2dnaWVhcHAvZnJvZ2dpZVwiLFxuICBcImF1dGhvclwiOiB7XG4gICAgXCJuYW1lXCI6IFwidmljb2RpbmVlXCJcbiAgfSxcbiAgXCJidWlsZFwiOiB7XG4gICAgXCJhc2FyXCI6IHRydWUsXG4gICAgXCJwcm9kdWN0TmFtZVwiOiBcImZyb2dnaWVcIixcbiAgICBcImZpbGVzXCI6IFtcbiAgICAgIFwiYnVpbGQvKiovKlwiLFxuICAgICAgXCIhbm9kZV9tb2R1bGVzXCJcbiAgICBdLFxuICAgIFwiYXBwSWRcIjogXCJjb20uZnJvZ2dpZS5hcHBcIixcbiAgICBcIm1hY1wiOiB7XG4gICAgICBcImNhdGVnb3J5XCI6IFwicHVibGljLmFwcC1jYXRlZ29yeS5zb2NpYWwtbmV0d29ya2luZ1wiLFxuICAgICAgXCJhcnRpZmFjdE5hbWVcIjogXCIke3Byb2R1Y3ROYW1lfS0ke3ZlcnNpb259LSR7b3N9LSR7YXJjaH0uJHtleHR9XCJcbiAgICB9LFxuICAgIFwid2luXCI6IHtcbiAgICAgIFwidGFyZ2V0XCI6IFwibnNpc1wiLFxuICAgICAgXCJhcnRpZmFjdE5hbWVcIjogXCIke3Byb2R1Y3ROYW1lfS0ke3ZlcnNpb259LSR7b3N9LSR7YXJjaH0uJHtleHR9XCJcbiAgICB9LFxuICAgIFwibGludXhcIjoge1xuICAgICAgXCJ0YXJnZXRcIjogXCJBcHBJbWFnZVwiLFxuICAgICAgXCJhcnRpZmFjdE5hbWVcIjogXCIke3Byb2R1Y3ROYW1lfS0ke3ZlcnNpb259LSR7b3N9LSR7YXJjaH0uJHtleHR9XCIsXG4gICAgICBcImNhdGVnb3J5XCI6IFwiTmV0d29ya1wiXG4gICAgfSxcbiAgICBcInB1Ymxpc2hcIjoge1xuICAgICAgXCJwcm92aWRlclwiOiBcImdpdGh1YlwiLFxuICAgICAgXCJyZXBvXCI6IFwiZnJvZ2dpZVwiLFxuICAgICAgXCJvd25lclwiOiBcImZyb2dnaWVhcHBcIixcbiAgICAgIFwicmVsZWFzZVR5cGVcIjogXCJyZWxlYXNlXCJcbiAgICB9XG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJidWlsZFwiOiBcInlhcm4gdml0ZSBidWlsZFwiLFxuICAgIFwiYnVpbGQ6bG9jYWxcIjogXCJ5YXJuIHZpdGUgYnVpbGQgJiYgeWFybiBhcHA6ZGlzdFwiLFxuICAgIFwiZGV2XCI6IFwidml0ZVwiLFxuICAgIFwidGVzdDplbGVjdHJvblwiOiBcInZpdGVzdCBydW4gLS1jb25maWcgLi92aXRlc3QuZWxlY3Ryb24uY29uZmlnLnRzXCIsXG4gICAgXCJ0ZXN0OnJlYWN0XCI6IFwidml0ZXN0IHJ1biAtLWNvbmZpZyAuL3ZpdGVzdC5yZWFjdC5jb25maWcudHNcIixcbiAgICBcImxpbnQ6c3R5bGVcIjogXCJzdHlsZWxpbnQgLS1maXggXFxcIioqLyouY3NzXFxcIiAtLWlnbm9yZS1wYXRoIC5naXRpZ25vcmVcIixcbiAgICBcImxpbnQ6Zml4XCI6IFwieWFybiBlc2xpbnQgc3JjIC0tZml4XCIsXG4gICAgXCJwcmV0dGllcjpmaXhcIjogXCJ5YXJuIHByZXR0aWVyIHNyYyAtLWNoZWNrIC0td3JpdGVcIixcbiAgICBcImZvcm1hdFwiOiBcInlhcm4gbGludDpzdHlsZSAmJiB5YXJuIHByZXR0aWVyOmZpeCAmJiB5YXJuIGxpbnQ6Zml4XCIsXG4gICAgXCJ0ZXN0XCI6IFwieWFybiB0c2MgLS1ub0VtaXQgJiYgeWFybiB0ZXN0OmVsZWN0cm9uICYmIHlhcm4gdGVzdDpyZWFjdFwiLFxuICAgIFwiYXBwOmRpclwiOiBcInlhcm4gZWxlY3Ryb24tYnVpbGRlciAtLWRpclwiLFxuICAgIFwiYXBwOmRpc3RcIjogXCJ5YXJuIGVsZWN0cm9uLWJ1aWxkZXJcIixcbiAgICBcInN0b3J5Ym9va1wiOiBcInN0b3J5Ym9vayBkZXYgLXAgNjAwNlwiLFxuICAgIFwiYnVpbGQtc3Rvcnlib29rXCI6IFwic3Rvcnlib29rIGJ1aWxkXCIsXG4gICAgXCJnZXQtY2hhbmdlbG9nXCI6IFwibm9kZSAuL2dldENoYW5nZWxvZy5tanNcIixcbiAgICBcImUyZVwiOiBcInlhcm4gcGxheXdyaWdodCB0ZXN0XCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGJhYmVsL2NvcmVcIjogXCJeNy4yMy42XCIsXG4gICAgXCJAYmFiZWwvcGx1Z2luLXRyYW5zZm9ybS1yZWFjdC1qc3gtc291cmNlXCI6IFwiXjcuMjMuM1wiLFxuICAgIFwiQGJhYmVsL3ByZXNldC1lbnZcIjogXCJeNy4yMy4zXCIsXG4gICAgXCJAYmFiZWwvcHJlc2V0LXJlYWN0XCI6IFwiXjcuMjMuM1wiLFxuICAgIFwiQGJhYmVsL3ByZXNldC10eXBlc2NyaXB0XCI6IFwiXjcuMjMuM1wiLFxuICAgIFwiQG9jdG9raXQvcmVzdFwiOiBcIl4yMC4wLjJcIixcbiAgICBcIkBvcmlnaW5qcy92aXRlLXBsdWdpbi1jb21tb25qc1wiOiBcIl4xLjAuM1wiLFxuICAgIFwiQHBsYXl3cmlnaHQvdGVzdFwiOiBcIl4xLjQwLjFcIixcbiAgICBcIkBwcmVhY3QvcHJlc2V0LXZpdGVcIjogXCJeMi43LjBcIixcbiAgICBcIkBzdG9yeWJvb2svYWRkb24tZXNzZW50aWFsc1wiOiBcIl43LjYuNFwiLFxuICAgIFwiQHN0b3J5Ym9vay9hZGRvbi1pbnRlcmFjdGlvbnNcIjogXCJeNy42LjRcIixcbiAgICBcIkBzdG9yeWJvb2svYWRkb24tbGlua3NcIjogXCJeNy42LjRcIixcbiAgICBcIkBzdG9yeWJvb2svYWRkb24tb25ib2FyZGluZ1wiOiBcIl4xLjAuMTBcIixcbiAgICBcIkBzdG9yeWJvb2svYmxvY2tzXCI6IFwiXjcuNi40XCIsXG4gICAgXCJAc3Rvcnlib29rL3ByZWFjdC12aXRlXCI6IFwiXjcuNi41XCIsXG4gICAgXCJAc3Rvcnlib29rL3JlYWN0XCI6IFwiXjcuNi40XCIsXG4gICAgXCJAc3Rvcnlib29rL3Rlc3RcIjogXCJeNy42LjRcIixcbiAgICBcIkB0ZXN0aW5nLWxpYnJhcnkvcHJlYWN0XCI6IFwiXjMuMi4zXCIsXG4gICAgXCJAdHlwZXMvYmFiZWxfX2NvcmVcIjogXCJeN1wiLFxuICAgIFwiQHR5cGVzL2plc3RcIjogXCJeMjkuNS4xMVwiLFxuICAgIFwiQHR5cGVzL21pY3JvbW9kYWxcIjogXCJeMC4zLjVcIixcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjIwLjEwLjZcIixcbiAgICBcIkB0eXBlcy9wb3N0Y3NzLXJlcG9ydGVyXCI6IFwiXjdcIixcbiAgICBcIkB0eXBlcy9yZWFjdFwiOiBcIl4xN1wiLFxuICAgIFwiQHR5cGVzL3JlYWN0LWRvbVwiOiBcIl4xN1wiLFxuICAgIFwiQHR5cGVzL3JvbGx1cC1wbHVnaW4tcG9zdGNzc1wiOiBcIl4zLjEuNFwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNi4xMy4wXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjYuMTMuMFwiLFxuICAgIFwiQHdlbGxkb25lLXNvZnR3YXJlL3doeS1kaWQteW91LXJlbmRlclwiOiBcIl43LjAuMVwiLFxuICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwLjQuMTZcIixcbiAgICBcImJhYmVsLWplc3RcIjogXCJeMjkuNy4wXCIsXG4gICAgXCJkb2l1c2VcIjogXCJeNi4wLjJcIixcbiAgICBcImVsZWN0cm9uXCI6IFwiXjI4LjAuMFwiLFxuICAgIFwiZWxlY3Ryb24tYnVpbGRlclwiOiBcIl4yNC45LjFcIixcbiAgICBcImVsZWN0cm9uLXBsYXl3cmlnaHQtaGVscGVyc1wiOiBcIl4xLjcuMFwiLFxuICAgIFwiZXNsaW50XCI6IFwiXjguNTYuMFwiLFxuICAgIFwiZXNsaW50LWNvbmZpZy1wcmVhY3RcIjogXCJeMS4zLjBcIixcbiAgICBcImVzbGludC1jb25maWctcHJldHRpZXJcIjogXCJeOS4xLjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tamVzdFwiOiBcIl4yNy42LjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tcHJldHRpZXJcIjogXCJeNS4wLjFcIixcbiAgICBcImVzbGludC1wbHVnaW4tcmVhY3RcIjogXCJeNy4zMy4yXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0LWhvb2tzXCI6IFwiXjQuNi4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0LXBlcmZcIjogXCJeMy4zLjFcIixcbiAgICBcImVzbGludC1wbHVnaW4tc3Rvcnlib29rXCI6IFwiXjAuNi4xNVwiLFxuICAgIFwiamVzdFwiOiBcIl4yOS43LjBcIixcbiAgICBcImplc3QtZW52aXJvbm1lbnQtanNkb21cIjogXCJeMjkuNy4wXCIsXG4gICAgXCJqZXN0LXdlYnNvY2tldC1tb2NrXCI6IFwiXjIuNS4wXCIsXG4gICAgXCJqc2RvbVwiOiBcIl4yMy4wLjFcIixcbiAgICBcIm5vZGUtZmV0Y2hcIjogXCJeMy4zLjJcIixcbiAgICBcInBvc3Rjc3MtYmVtLWxpbnRlclwiOiBcIl40LjAuMVwiLFxuICAgIFwicG9zdGNzcy1uZXN0ZWRcIjogXCJeNi4wLjFcIixcbiAgICBcInBvc3Rjc3MtcmVwb3J0ZXJcIjogXCJeNy4wLjVcIixcbiAgICBcInByZXR0aWVyXCI6IFwiMy4xLjBcIixcbiAgICBcInJlYWN0LWRldnRvb2xzXCI6IFwiXjUuMC4wXCIsXG4gICAgXCJzdG9yeWJvb2tcIjogXCJeNy42LjRcIixcbiAgICBcInN0eWxlbGludFwiOiBcIl4xNi4xLjBcIixcbiAgICBcInN0eWxlbGludC1jb25maWctcmVjb21tZW5kZWRcIjogXCJeMTQuMC4wXCIsXG4gICAgXCJ0c2NvbmZpZy1wYXRoc1wiOiBcIl40LjIuMFwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjMuM1wiLFxuICAgIFwidml0ZVwiOiBcIl41LjAuNFwiLFxuICAgIFwidml0ZS1wbHVnaW4tZWxlY3Ryb25cIjogXCJeMC4xNS40XCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1lbGVjdHJvbi1yZW5kZXJlclwiOiBcIl4wLjE0LjVcIixcbiAgICBcInZpdGVzdFwiOiBcIl4xLjEuMFwiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBjYXBzaXplY3NzL2NvcmVcIjogXCJeMy4xLjFcIixcbiAgICBcIkBjYXBzaXplY3NzL21ldHJpY3NcIjogXCJeMS4yLjBcIixcbiAgICBcIkBlbW9qaS1tYXJ0L2RhdGFcIjogXCJeMS4xLjJcIixcbiAgICBcIkBoZXJvaWNvbnMvcmVhY3RcIjogXCJeMi4wLjE4XCIsXG4gICAgXCJAbGV4aWNhbC9yZWFjdFwiOiBcIl4wLjEyLjVcIixcbiAgICBcIkBsZXhpY2FsL3V0aWxzXCI6IFwiXjAuMTIuNVwiLFxuICAgIFwiQHRhYmxlci9pY29ucy1yZWFjdFwiOiBcIl4yLjQ0LjBcIixcbiAgICBcIkB0YW5zdGFjay9yZWFjdC1xdWVyeVwiOiBcIl41LjEyLjJcIixcbiAgICBcImRheWpzXCI6IFwiXjEuMTEuMTBcIixcbiAgICBcImRlYm91bmNlXCI6IFwiXjIuMC4wXCIsXG4gICAgXCJmYXN0ZXN0LWxldmVuc2h0ZWluXCI6IFwiXjEuMC4xNlwiLFxuICAgIFwiaW1tZXJcIjogXCJeMTAuMC4zXCIsXG4gICAgXCJsZXhpY2FsXCI6IFwiXjAuMTIuNVwiLFxuICAgIFwibWljcm9tb2RhbFwiOiBcIl4wLjQuMTBcIixcbiAgICBcInByZWFjdFwiOiBcIl4xMC4xOS4zXCIsXG4gICAgXCJyZWFjdFwiOiBcIm5wbTpAcHJlYWN0L2NvbXBhdEAqXCIsXG4gICAgXCJyZWFjdC1kb21cIjogXCJucG06QHByZWFjdC9jb21wYXRAKlwiLFxuICAgIFwicmVhY3QtZWFzeS1lbW9qaVwiOiBcIl4xLjguMVwiLFxuICAgIFwicmVhY3QtaWNvbnNcIjogXCJeNC4xMi4wXCIsXG4gICAgXCJyZWFjdC10b2FzdGlmeVwiOiBcIl45LjEuM1wiLFxuICAgIFwicmVhY3QtdG9vbHRpcFwiOiBcIl41LjI1LjBcIixcbiAgICBcInJlYWN0LXVzZS1kcmFnZ2FibGUtc2Nyb2xsXCI6IFwiXjAuNC43XCIsXG4gICAgXCJyZWFjdC12aXJ0dW9zb1wiOiBcIl40LjYuMlwiLFxuICAgIFwidHdlbW9qaS1yZWFjdC1hc3NldHNcIjogXCJodHRwczovL2dpdGh1Yi5jb20vZnJvZ2dpZWFwcC90d2Vtb2ppLXJlYWN0LWFzc2V0cy5naXRcIixcbiAgICBcIndvdXRlci1wcmVhY3RcIjogXCJeMi4xMi4yXCIsXG4gICAgXCJ6dXN0YW5kXCI6IFwiXjQuNC42XCJcbiAgfSxcbiAgXCJwYWNrYWdlTWFuYWdlclwiOiBcInlhcm5ANC4wLjJcIixcbiAgXCJyZXNvbHV0aW9uc1wiOiB7XG4gICAgXCJyZWFjdFwiOiBcIm5wbTpAcHJlYWN0L2NvbXBhdEAqXCIsXG4gICAgXCJyZWFjdC1kb21cIjogXCJucG06QHByZWFjdC9jb21wYXRAKlwiXG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1QsU0FBUyxjQUFjO0FBQy9VLFNBQTRCLG9CQUFvQjtBQUNoRCxPQUFPLGNBQWM7OztBQ0ZyQjtBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsYUFBZTtBQUFBLEVBQ2YsTUFBUTtBQUFBLEVBQ1IsVUFBWTtBQUFBLEVBQ1osUUFBVTtBQUFBLElBQ1IsTUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLE9BQVM7QUFBQSxJQUNQLE1BQVE7QUFBQSxJQUNSLGFBQWU7QUFBQSxJQUNmLE9BQVM7QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLE9BQVM7QUFBQSxJQUNULEtBQU87QUFBQSxNQUNMLFVBQVk7QUFBQSxNQUNaLGNBQWdCO0FBQUEsSUFDbEI7QUFBQSxJQUNBLEtBQU87QUFBQSxNQUNMLFFBQVU7QUFBQSxNQUNWLGNBQWdCO0FBQUEsSUFDbEI7QUFBQSxJQUNBLE9BQVM7QUFBQSxNQUNQLFFBQVU7QUFBQSxNQUNWLGNBQWdCO0FBQUEsTUFDaEIsVUFBWTtBQUFBLElBQ2Q7QUFBQSxJQUNBLFNBQVc7QUFBQSxNQUNULFVBQVk7QUFBQSxNQUNaLE1BQVE7QUFBQSxNQUNSLE9BQVM7QUFBQSxNQUNULGFBQWU7QUFBQSxJQUNqQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVc7QUFBQSxJQUNULE9BQVM7QUFBQSxJQUNULGVBQWU7QUFBQSxJQUNmLEtBQU87QUFBQSxJQUNQLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLGNBQWM7QUFBQSxJQUNkLFlBQVk7QUFBQSxJQUNaLGdCQUFnQjtBQUFBLElBQ2hCLFFBQVU7QUFBQSxJQUNW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QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNMO0FBQUEsSUFDRjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBLGNBQWM7QUFBQSxNQUNaLGdCQUFnQjtBQUFBLFFBQ2QsU0FBUTtBQUFBLFVBQ04sZ0JBQWdCLENBQUMscUJBQXFCLENBQUM7QUFBQSxRQUN6QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDRixTQUFTO0FBQUEsTUFDUCxTQUFTLDZCQUE2QjtBQUFBLE1BQ3RDLGFBQWE7QUFBQSxNQUNiLE9BQU87QUFBQSxRQUNMLE9BQU87QUFBQSxVQUNMLFlBQVk7QUFBQSxRQUNkO0FBQUEsTUFDRixDQUFDO0FBQUEsTUFDRCxTQUFTO0FBQUEsUUFDUDtBQUFBLFVBQ0UsT0FBTztBQUFBLFVBQ1AsUUFBUSxTQUFTO0FBQ2Ysb0JBQVEsUUFBUTtBQUFBLFVBQ2xCO0FBQUEsVUFDQSxNQUFNO0FBQUEsWUFDSixPQUFPO0FBQUEsY0FDTDtBQUFBLGNBQ0EsUUFBUTtBQUFBLGNBQ1IsUUFBUTtBQUFBLGNBQ1IsZUFBZTtBQUFBLGdCQUNiLFVBQVUsT0FBTyxLQUFLLGtCQUFrQixrQkFBTSxnQkFBSSxlQUFlLENBQUMsQ0FBQztBQUFBLGNBQ3JFO0FBQUEsWUFDRjtBQUFBLFlBQ0EsU0FBUztBQUFBLGNBQ0w7QUFBQSxZQUNGO0FBQUEsVUFDSjtBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUEsVUFDRSxPQUFPO0FBQUEsVUFDUCxRQUFRLE1BQU07QUFHWixpQkFBSyxPQUFPO0FBQUEsVUFDZDtBQUFBLFVBQ0EsTUFBTTtBQUFBLFlBQ0osT0FBTztBQUFBLGNBQ0wsV0FBVyxZQUFZLFdBQVc7QUFBQTtBQUFBLGNBQ2xDLFFBQVE7QUFBQSxjQUNSLFFBQVE7QUFBQSxjQUNSLGVBQWU7QUFBQSxnQkFDYixVQUFVLE9BQU8sS0FBSyxrQkFBa0Isa0JBQU0sZ0JBQUksZUFBZSxDQUFDLENBQUM7QUFBQSxjQUNyRTtBQUFBLFlBQ0Y7QUFBQSxZQUNBLFNBQVM7QUFBQSxjQUNMO0FBQUEsWUFDRjtBQUFBLFVBQ0o7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ0osTUFBTTtBQUFBLElBQ1Y7QUFBQSxJQUNBLGFBQWE7QUFBQSxFQUNmO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
