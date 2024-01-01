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
    "get-changelog": "node ./getChangelog.mjs"
  },
  devDependencies: {
    "@babel/core": "^7.23.6",
    "@babel/plugin-transform-react-jsx-source": "^7.23.3",
    "@babel/preset-env": "^7.23.3",
    "@babel/preset-react": "^7.23.3",
    "@babel/preset-typescript": "^7.23.3",
    "@octokit/rest": "^20.0.2",
    "@originjs/vite-plugin-commonjs": "^1.0.3",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIiwgInBhY2thZ2UuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFxLaWNrZXJpbm9cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFxLaWNrZXJpbm9cXFxcdml0ZS5jb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy91c2VyL0RvY3VtZW50cy9HaXRIdWIvS2lja2VyaW5vL3ZpdGUuY29uZmlnLm10c1wiO2ltcG9ydCB7IHJtU3luYyB9IGZyb20gJ25vZGU6ZnMnXHJcbmltcG9ydCB7IENvbmZpZ0VudiwgUGx1Z2luLCBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgZWxlY3Ryb24gZnJvbSAndml0ZS1wbHVnaW4tZWxlY3Ryb24nXHJcbmltcG9ydCBwa2cgZnJvbSAnLi9wYWNrYWdlLmpzb24nXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcbmltcG9ydCB7IEpTRE9NIH0gZnJvbSAnanNkb20nXHJcbmltcG9ydCBjaGlsZCBmcm9tICdjaGlsZF9wcm9jZXNzJ1xyXG5pbXBvcnQgcHJlYWN0IGZyb20gXCJAcHJlYWN0L3ByZXNldC12aXRlXCI7XHJcbmltcG9ydCB7IGVzYnVpbGRDb21tb25qcywgdml0ZUNvbW1vbmpzIH0gZnJvbSAnQG9yaWdpbmpzL3ZpdGUtcGx1Z2luLWNvbW1vbmpzJ1xyXG5cclxuZXhwb3J0IGNvbnN0IGFsaWFzID0gIHtcclxuICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxyXG4gIFwic3JjXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvcmVhY3RcIiksXHJcbiAgXCJAZWxlY3Ryb25cIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9lbGVjdHJvblwiKSxcclxuICBcIkBzdHlsZXNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9yZWFjdC9zdHlsZXNcIiksXHJcbiAgXCJAc2hhcmVkXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvcmVhY3Qvc2hhcmVkXCIpLFxyXG4gIFwiQEZyb2dnaWVUeXBlc1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vdHlwZXNcIiksXHJcbiAgXCJyZWFjdFwiOiBcInByZWFjdC9jb21wYXRcIixcclxuICBcInJlYWN0LWRvbS90ZXN0LXV0aWxzXCI6IFwicHJlYWN0L3Rlc3QtdXRpbHNcIixcclxuICBcInJlYWN0LWRvbVwiOiBcInByZWFjdC9jb21wYXRcIixcclxuICBcInJlYWN0L2pzeC1ydW50aW1lXCI6IFwicHJlYWN0L2pzeC1ydW50aW1lXCJcclxufVxyXG5cclxuY29uc3QgYWRkUmVhY3REZXZUb29sc1NjcmlwdFBsdWdpbiA9ICgpID0+ICh7XHJcbiAgbmFtZTogJ2FkZC1yZWFjdC1kZXZ0b29scy1zY3JpcHQnLFxyXG4gIGFwcGx5OiAnc2VydmUnLFxyXG4gIHRyYW5zZm9ybUluZGV4SHRtbChodG1sKSB7XHJcbiAgICBjb25zdCBqc2RvbSA9IG5ldyBKU0RPTShodG1sKTtcclxuICAgIGNvbnN0IHNjcmlwdCA9IGpzZG9tLndpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxyXG4gICAgc2NyaXB0LnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiXHJcbiAgICBzY3JpcHQuc3JjID0gXCJodHRwOi8vbG9jYWxob3N0OjgwOTdcIlxyXG4gICAganNkb20ud2luZG93LmRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KVxyXG4gICAgcmV0dXJuIGpzZG9tLnNlcmlhbGl6ZSgpIFxyXG4gIH0sXHJcbn0gYXMgUGx1Z2luKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfTogQ29uZmlnRW52KSA9PiB7XHJcbiAgcm1TeW5jKCdkaXN0JywgeyByZWN1cnNpdmU6IHRydWUsIGZvcmNlOiB0cnVlIH0pXHJcblxyXG4gIGNvbnN0IGlzRGV2ID0gbW9kZSA9PT0gJ2RldmVsb3BtZW50J1xyXG4gIGNvbnN0IGlzQnVpbGQgPSBjb21tYW5kID09PSAnYnVpbGQnXHJcbiAgY29uc3Qgc291cmNlbWFwID0gdHJ1ZVxyXG5cclxuICBjb25zb2xlLmxvZygnVml0ZSBidWlsZCcsIG1vZGUsIGNvbW1hbmQpXHJcblxyXG4gIGlmIChpc0Rldikge1xyXG4gICAgY2hpbGQuZXhlYygnbnB4IHJlYWN0LWRldnRvb2xzJylcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBiYXNlOiAnJyxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgICBhbGlhczogYWxpYXMsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgc291cmNlbWFwOiB0cnVlLFxyXG4gICAgICAgIG91dERpcjogJy4vYnVpbGQnLFxyXG4gICAgICB9LFxyXG4gICAgICBvcHRpbWl6ZURlcHM6IHtcclxuICAgICAgICBlc2J1aWxkT3B0aW9uczoge1xyXG4gICAgICAgICAgcGx1Z2luczpbXHJcbiAgICAgICAgICAgIGVzYnVpbGRDb21tb25qcyhbJ0BjYXBzaXplY3NzL21ldHJpY3MnXSkgXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICBpc0RldiAmJiBhZGRSZWFjdERldlRvb2xzU2NyaXB0UGx1Z2luKCksXHJcbiAgICAgIHZpdGVDb21tb25qcygpLFxyXG4gICAgICBwcmVhY3Qoe1xyXG4gICAgICAgIGJhYmVsOiB7XHJcbiAgICAgICAgICBjb25maWdGaWxlOiB0cnVlLFxyXG4gICAgICAgIH1cclxuICAgICAgfSksXHJcbiAgICAgIGVsZWN0cm9uKFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBlbnRyeTogJ3NyYy9lbGVjdHJvbi9lbGVjdHJvbi50cycsXHJcbiAgICAgICAgICBvbnN0YXJ0KG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5zdGFydHVwKClcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB2aXRlOiB7XHJcbiAgICAgICAgICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgICAgICAgc291cmNlbWFwLFxyXG4gICAgICAgICAgICAgIG1pbmlmeTogaXNCdWlsZCxcclxuICAgICAgICAgICAgICBvdXREaXI6ICdidWlsZC9lbGVjdHJvbicsXHJcbiAgICAgICAgICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgZXh0ZXJuYWw6IE9iamVjdC5rZXlzKCdkZXBlbmRlbmNpZXMnIGluIHBrZyA/IHBrZy5kZXBlbmRlbmNpZXMgOiB7fSksXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgYWxpYXM6IGFsaWFzLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZW50cnk6ICdzcmMvZWxlY3Ryb24vcHJlbG9hZC50cycsXHJcbiAgICAgICAgICBvbnN0YXJ0KGFyZ3MpIHtcclxuICAgICAgICAgICAgLy8gTm90aWZ5IHRoZSBSZW5kZXJlciBwcm9jZXNzIHRvIHJlbG9hZCB0aGUgcGFnZSB3aGVuIHRoZSBQcmVsb2FkIHNjcmlwdHMgYnVpbGQgaXMgY29tcGxldGUsIFxyXG4gICAgICAgICAgICAvLyBpbnN0ZWFkIG9mIHJlc3RhcnRpbmcgdGhlIGVudGlyZSBFbGVjdHJvbiBBcHAuXHJcbiAgICAgICAgICAgIGFyZ3MucmVsb2FkKClcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB2aXRlOiB7XHJcbiAgICAgICAgICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgICAgICAgc291cmNlbWFwOiBzb3VyY2VtYXAgPyAnaW5saW5lJyA6IHVuZGVmaW5lZCwgLy8gIzMzMlxyXG4gICAgICAgICAgICAgIG1pbmlmeTogaXNCdWlsZCxcclxuICAgICAgICAgICAgICBvdXREaXI6ICdidWlsZCcsXHJcbiAgICAgICAgICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgZXh0ZXJuYWw6IE9iamVjdC5rZXlzKCdkZXBlbmRlbmNpZXMnIGluIHBrZyA/IHBrZy5kZXBlbmRlbmNpZXMgOiB7fSksXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgYWxpYXM6IGFsaWFzLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgICAgXSksXHJcbiAgICBdLFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgICAgcG9ydDogMzAwMCxcclxuICAgIH0sXHJcbiAgICBjbGVhclNjcmVlbjogZmFsc2UsXHJcbiAgfVxyXG59KSIsICJ7XG4gIFwibmFtZVwiOiBcImZyb2dnaWVcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4yLjE4XCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJBIGNoYXQgYXBwbGljYXRpb25cIixcbiAgXCJtYWluXCI6IFwiLi9idWlsZC9lbGVjdHJvbi9lbGVjdHJvbi5qc1wiLFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2Zyb2dnaWVhcHAvZnJvZ2dpZVwiLFxuICBcImF1dGhvclwiOiB7XG4gICAgXCJuYW1lXCI6IFwidmljb2RpbmVlXCJcbiAgfSxcbiAgXCJidWlsZFwiOiB7XG4gICAgXCJhc2FyXCI6IHRydWUsXG4gICAgXCJwcm9kdWN0TmFtZVwiOiBcImZyb2dnaWVcIixcbiAgICBcImZpbGVzXCI6IFtcbiAgICAgIFwiYnVpbGQvKiovKlwiLFxuICAgICAgXCIhbm9kZV9tb2R1bGVzXCJcbiAgICBdLFxuICAgIFwiYXBwSWRcIjogXCJjb20uZnJvZ2dpZS5hcHBcIixcbiAgICBcIm1hY1wiOiB7XG4gICAgICBcImNhdGVnb3J5XCI6IFwicHVibGljLmFwcC1jYXRlZ29yeS5zb2NpYWwtbmV0d29ya2luZ1wiLFxuICAgICAgXCJhcnRpZmFjdE5hbWVcIjogXCIke3Byb2R1Y3ROYW1lfS0ke3ZlcnNpb259LSR7b3N9LSR7YXJjaH0uJHtleHR9XCJcbiAgICB9LFxuICAgIFwid2luXCI6IHtcbiAgICAgIFwidGFyZ2V0XCI6IFwibnNpc1wiLFxuICAgICAgXCJhcnRpZmFjdE5hbWVcIjogXCIke3Byb2R1Y3ROYW1lfS0ke3ZlcnNpb259LSR7b3N9LSR7YXJjaH0uJHtleHR9XCJcbiAgICB9LFxuICAgIFwibGludXhcIjoge1xuICAgICAgXCJ0YXJnZXRcIjogXCJBcHBJbWFnZVwiLFxuICAgICAgXCJhcnRpZmFjdE5hbWVcIjogXCIke3Byb2R1Y3ROYW1lfS0ke3ZlcnNpb259LSR7b3N9LSR7YXJjaH0uJHtleHR9XCIsXG4gICAgICBcImNhdGVnb3J5XCI6IFwiTmV0d29ya1wiXG4gICAgfSxcbiAgICBcInB1Ymxpc2hcIjoge1xuICAgICAgXCJwcm92aWRlclwiOiBcImdpdGh1YlwiLFxuICAgICAgXCJyZXBvXCI6IFwiZnJvZ2dpZVwiLFxuICAgICAgXCJvd25lclwiOiBcImZyb2dnaWVhcHBcIixcbiAgICAgIFwicmVsZWFzZVR5cGVcIjogXCJyZWxlYXNlXCJcbiAgICB9XG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJidWlsZFwiOiBcInlhcm4gdml0ZSBidWlsZFwiLFxuICAgIFwiYnVpbGQ6bG9jYWxcIjogXCJ5YXJuIHZpdGUgYnVpbGQgJiYgeWFybiBhcHA6ZGlzdFwiLFxuICAgIFwiZGV2XCI6IFwidml0ZVwiLFxuICAgIFwidGVzdDplbGVjdHJvblwiOiBcInZpdGVzdCBydW4gLS1jb25maWcgLi92aXRlc3QuZWxlY3Ryb24uY29uZmlnLnRzXCIsXG4gICAgXCJ0ZXN0OnJlYWN0XCI6IFwidml0ZXN0IHJ1biAtLWNvbmZpZyAuL3ZpdGVzdC5yZWFjdC5jb25maWcudHNcIixcbiAgICBcImxpbnQ6c3R5bGVcIjogXCJzdHlsZWxpbnQgLS1maXggXFxcIioqLyouY3NzXFxcIiAtLWlnbm9yZS1wYXRoIC5naXRpZ25vcmVcIixcbiAgICBcImxpbnQ6Zml4XCI6IFwieWFybiBlc2xpbnQgc3JjIC0tZml4XCIsXG4gICAgXCJwcmV0dGllcjpmaXhcIjogXCJ5YXJuIHByZXR0aWVyIHNyYyAtLWNoZWNrIC0td3JpdGVcIixcbiAgICBcImZvcm1hdFwiOiBcInlhcm4gbGludDpzdHlsZSAmJiB5YXJuIHByZXR0aWVyOmZpeCAmJiB5YXJuIGxpbnQ6Zml4XCIsXG4gICAgXCJ0ZXN0XCI6IFwieWFybiB0c2MgLS1ub0VtaXQgJiYgeWFybiB0ZXN0OmVsZWN0cm9uICYmIHlhcm4gdGVzdDpyZWFjdFwiLFxuICAgIFwiYXBwOmRpclwiOiBcInlhcm4gZWxlY3Ryb24tYnVpbGRlciAtLWRpclwiLFxuICAgIFwiYXBwOmRpc3RcIjogXCJ5YXJuIGVsZWN0cm9uLWJ1aWxkZXJcIixcbiAgICBcInN0b3J5Ym9va1wiOiBcInN0b3J5Ym9vayBkZXYgLXAgNjAwNlwiLFxuICAgIFwiYnVpbGQtc3Rvcnlib29rXCI6IFwic3Rvcnlib29rIGJ1aWxkXCIsXG4gICAgXCJnZXQtY2hhbmdlbG9nXCI6IFwibm9kZSAuL2dldENoYW5nZWxvZy5tanNcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAYmFiZWwvY29yZVwiOiBcIl43LjIzLjZcIixcbiAgICBcIkBiYWJlbC9wbHVnaW4tdHJhbnNmb3JtLXJlYWN0LWpzeC1zb3VyY2VcIjogXCJeNy4yMy4zXCIsXG4gICAgXCJAYmFiZWwvcHJlc2V0LWVudlwiOiBcIl43LjIzLjNcIixcbiAgICBcIkBiYWJlbC9wcmVzZXQtcmVhY3RcIjogXCJeNy4yMy4zXCIsXG4gICAgXCJAYmFiZWwvcHJlc2V0LXR5cGVzY3JpcHRcIjogXCJeNy4yMy4zXCIsXG4gICAgXCJAb2N0b2tpdC9yZXN0XCI6IFwiXjIwLjAuMlwiLFxuICAgIFwiQG9yaWdpbmpzL3ZpdGUtcGx1Z2luLWNvbW1vbmpzXCI6IFwiXjEuMC4zXCIsXG4gICAgXCJAcHJlYWN0L3ByZXNldC12aXRlXCI6IFwiXjIuNy4wXCIsXG4gICAgXCJAc3Rvcnlib29rL2FkZG9uLWVzc2VudGlhbHNcIjogXCJeNy42LjRcIixcbiAgICBcIkBzdG9yeWJvb2svYWRkb24taW50ZXJhY3Rpb25zXCI6IFwiXjcuNi40XCIsXG4gICAgXCJAc3Rvcnlib29rL2FkZG9uLWxpbmtzXCI6IFwiXjcuNi40XCIsXG4gICAgXCJAc3Rvcnlib29rL2FkZG9uLW9uYm9hcmRpbmdcIjogXCJeMS4wLjEwXCIsXG4gICAgXCJAc3Rvcnlib29rL2Jsb2Nrc1wiOiBcIl43LjYuNFwiLFxuICAgIFwiQHN0b3J5Ym9vay9wcmVhY3Qtdml0ZVwiOiBcIl43LjYuNVwiLFxuICAgIFwiQHN0b3J5Ym9vay9yZWFjdFwiOiBcIl43LjYuNFwiLFxuICAgIFwiQHN0b3J5Ym9vay90ZXN0XCI6IFwiXjcuNi40XCIsXG4gICAgXCJAdGVzdGluZy1saWJyYXJ5L3ByZWFjdFwiOiBcIl4zLjIuM1wiLFxuICAgIFwiQHR5cGVzL2JhYmVsX19jb3JlXCI6IFwiXjdcIixcbiAgICBcIkB0eXBlcy9qZXN0XCI6IFwiXjI5LjUuMTFcIixcbiAgICBcIkB0eXBlcy9taWNyb21vZGFsXCI6IFwiXjAuMy41XCIsXG4gICAgXCJAdHlwZXMvcG9zdGNzcy1yZXBvcnRlclwiOiBcIl43XCIsXG4gICAgXCJAdHlwZXMvcmVhY3RcIjogXCJeMTdcIixcbiAgICBcIkB0eXBlcy9yZWFjdC1kb21cIjogXCJeMTdcIixcbiAgICBcIkB0eXBlcy9yb2xsdXAtcGx1Z2luLXBvc3Rjc3NcIjogXCJeMy4xLjRcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiXjYuMTMuMFwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L3BhcnNlclwiOiBcIl42LjEzLjBcIixcbiAgICBcIkB3ZWxsZG9uZS1zb2Z0d2FyZS93aHktZGlkLXlvdS1yZW5kZXJcIjogXCJeNy4wLjFcIixcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjE2XCIsXG4gICAgXCJiYWJlbC1qZXN0XCI6IFwiXjI5LjcuMFwiLFxuICAgIFwiZG9pdXNlXCI6IFwiXjYuMC4yXCIsXG4gICAgXCJlbGVjdHJvblwiOiBcIl4yOC4wLjBcIixcbiAgICBcImVsZWN0cm9uLWJ1aWxkZXJcIjogXCJeMjQuOS4xXCIsXG4gICAgXCJlc2xpbnRcIjogXCJeOC41Ni4wXCIsXG4gICAgXCJlc2xpbnQtY29uZmlnLXByZWFjdFwiOiBcIl4xLjMuMFwiLFxuICAgIFwiZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl45LjEuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1qZXN0XCI6IFwiXjI3LjYuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1wcmV0dGllclwiOiBcIl41LjAuMVwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdFwiOiBcIl43LjMzLjJcIixcbiAgICBcImVzbGludC1wbHVnaW4tcmVhY3QtaG9va3NcIjogXCJeNC42LjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tcmVhY3QtcGVyZlwiOiBcIl4zLjMuMVwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1zdG9yeWJvb2tcIjogXCJeMC42LjE1XCIsXG4gICAgXCJqZXN0XCI6IFwiXjI5LjcuMFwiLFxuICAgIFwiamVzdC1lbnZpcm9ubWVudC1qc2RvbVwiOiBcIl4yOS43LjBcIixcbiAgICBcImplc3Qtd2Vic29ja2V0LW1vY2tcIjogXCJeMi41LjBcIixcbiAgICBcImpzZG9tXCI6IFwiXjIzLjAuMVwiLFxuICAgIFwibm9kZS1mZXRjaFwiOiBcIl4zLjMuMlwiLFxuICAgIFwicG9zdGNzcy1iZW0tbGludGVyXCI6IFwiXjQuMC4xXCIsXG4gICAgXCJwb3N0Y3NzLW5lc3RlZFwiOiBcIl42LjAuMVwiLFxuICAgIFwicG9zdGNzcy1yZXBvcnRlclwiOiBcIl43LjAuNVwiLFxuICAgIFwicHJldHRpZXJcIjogXCIzLjEuMFwiLFxuICAgIFwicmVhY3QtZGV2dG9vbHNcIjogXCJeNS4wLjBcIixcbiAgICBcInN0b3J5Ym9va1wiOiBcIl43LjYuNFwiLFxuICAgIFwic3R5bGVsaW50XCI6IFwiXjE2LjEuMFwiLFxuICAgIFwic3R5bGVsaW50LWNvbmZpZy1yZWNvbW1lbmRlZFwiOiBcIl4xNC4wLjBcIixcbiAgICBcInRzY29uZmlnLXBhdGhzXCI6IFwiXjQuMi4wXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuMy4zXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuMC40XCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1lbGVjdHJvblwiOiBcIl4wLjE1LjRcIixcbiAgICBcInZpdGUtcGx1Z2luLWVsZWN0cm9uLXJlbmRlcmVyXCI6IFwiXjAuMTQuNVwiLFxuICAgIFwidml0ZXN0XCI6IFwiXjEuMS4wXCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGNhcHNpemVjc3MvY29yZVwiOiBcIl4zLjEuMVwiLFxuICAgIFwiQGNhcHNpemVjc3MvbWV0cmljc1wiOiBcIl4xLjIuMFwiLFxuICAgIFwiQGVtb2ppLW1hcnQvZGF0YVwiOiBcIl4xLjEuMlwiLFxuICAgIFwiQGhlcm9pY29ucy9yZWFjdFwiOiBcIl4yLjAuMThcIixcbiAgICBcIkBsZXhpY2FsL3JlYWN0XCI6IFwiXjAuMTIuNVwiLFxuICAgIFwiQGxleGljYWwvdXRpbHNcIjogXCJeMC4xMi41XCIsXG4gICAgXCJAdGFibGVyL2ljb25zLXJlYWN0XCI6IFwiXjIuNDQuMFwiLFxuICAgIFwiQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5XCI6IFwiXjUuMTIuMlwiLFxuICAgIFwiZGF5anNcIjogXCJeMS4xMS4xMFwiLFxuICAgIFwiZGVib3VuY2VcIjogXCJeMi4wLjBcIixcbiAgICBcImZhc3Rlc3QtbGV2ZW5zaHRlaW5cIjogXCJeMS4wLjE2XCIsXG4gICAgXCJpbW1lclwiOiBcIl4xMC4wLjNcIixcbiAgICBcImxleGljYWxcIjogXCJeMC4xMi41XCIsXG4gICAgXCJtaWNyb21vZGFsXCI6IFwiXjAuNC4xMFwiLFxuICAgIFwicHJlYWN0XCI6IFwiXjEwLjE5LjNcIixcbiAgICBcInJlYWN0XCI6IFwibnBtOkBwcmVhY3QvY29tcGF0QCpcIixcbiAgICBcInJlYWN0LWRvbVwiOiBcIm5wbTpAcHJlYWN0L2NvbXBhdEAqXCIsXG4gICAgXCJyZWFjdC1lYXN5LWVtb2ppXCI6IFwiXjEuOC4xXCIsXG4gICAgXCJyZWFjdC1pY29uc1wiOiBcIl40LjEyLjBcIixcbiAgICBcInJlYWN0LXRvYXN0aWZ5XCI6IFwiXjkuMS4zXCIsXG4gICAgXCJyZWFjdC10b29sdGlwXCI6IFwiXjUuMjUuMFwiLFxuICAgIFwicmVhY3QtdXNlLWRyYWdnYWJsZS1zY3JvbGxcIjogXCJeMC40LjdcIixcbiAgICBcInJlYWN0LXZpcnR1b3NvXCI6IFwiXjQuNi4yXCIsXG4gICAgXCJ0d2Vtb2ppLXJlYWN0LWFzc2V0c1wiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9mcm9nZ2llYXBwL3R3ZW1vamktcmVhY3QtYXNzZXRzLmdpdFwiLFxuICAgIFwid291dGVyLXByZWFjdFwiOiBcIl4yLjEyLjJcIixcbiAgICBcInp1c3RhbmRcIjogXCJeNC40LjZcIlxuICB9LFxuICBcInBhY2thZ2VNYW5hZ2VyXCI6IFwieWFybkA0LjAuMlwiLFxuICBcInJlc29sdXRpb25zXCI6IHtcbiAgICBcInJlYWN0XCI6IFwibnBtOkBwcmVhY3QvY29tcGF0QCpcIixcbiAgICBcInJlYWN0LWRvbVwiOiBcIm5wbTpAcHJlYWN0L2NvbXBhdEAqXCJcbiAgfVxufVxuIl0sCiAgIm1hcHBp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
