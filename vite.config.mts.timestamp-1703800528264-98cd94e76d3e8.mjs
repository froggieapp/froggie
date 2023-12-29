// vite.config.mts
import { rmSync } from "node:fs";
import { defineConfig } from "file:///C:/Users/user/Documents/GitHub/Kickerino/node_modules/vite/dist/node/index.js";
import electron from "file:///C:/Users/user/Documents/GitHub/Kickerino/node_modules/vite-plugin-electron/dist/index.mjs";

// package.json
var package_default = {
  name: "froggie",
  version: "0.2.14",
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
    "lint:fix": "yarn eslint src --fix",
    "prettier:fix": "yarn prettier src --check --write",
    format: "yarn prettier:fix && yarn lint:fix",
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
    "@types/rollup-plugin-postcss": "^3.1.4",
    "@typescript-eslint/eslint-plugin": "^6.13.0",
    "@typescript-eslint/parser": "^6.13.0",
    "@welldone-software/why-did-you-render": "^7.0.1",
    "babel-jest": "^29.7.0",
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
    prettier: "3.1.0",
    "react-devtools": "^5.0.0",
    storybook: "^7.6.4",
    "tsconfig-paths": "^4.2.0",
    typescript: "^5.3.3",
    vite: "^5.0.4",
    "vite-plugin-commonjs": "^0.10.1",
    "vite-plugin-electron": "^0.15.4",
    "vite-plugin-electron-renderer": "^0.14.5",
    vitest: "^1.1.0"
  },
  dependencies: {
    "@emoji-mart/data": "^1.1.2",
    "@heroicons/react": "^2.0.18",
    "@lexical/react": "^0.12.5",
    "@lexical/utils": "^0.12.5",
    "@tabler/icons-react": "^2.44.0",
    "@tanstack/react-query": "^5.12.2",
    "@tanstack/react-virtual": "^3.0.1",
    debounce: "^2.0.0",
    immer: "^10.0.3",
    lexical: "^0.12.5",
    micromodal: "^0.4.10",
    preact: "^10.19.3",
    "react-easy-emoji": "^1.8.1",
    "react-toastify": "^9.1.3",
    "react-tooltip": "^5.25.0",
    "react-use-draggable-scroll": "^0.4.7",
    "react-virtuoso": "^4.6.2",
    "twemoji-react-assets": "https://github.com/froggieapp/twemoji-react-assets",
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
    plugins: [
      isDev && addReactDevToolsScriptPlugin(),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIiwgInBhY2thZ2UuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFxLaWNrZXJpbm9cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFxLaWNrZXJpbm9cXFxcdml0ZS5jb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy91c2VyL0RvY3VtZW50cy9HaXRIdWIvS2lja2VyaW5vL3ZpdGUuY29uZmlnLm10c1wiO2ltcG9ydCB7IHJtU3luYyB9IGZyb20gJ25vZGU6ZnMnXHJcbmltcG9ydCB7IENvbmZpZ0VudiwgUGx1Z2luLCBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgZWxlY3Ryb24gZnJvbSAndml0ZS1wbHVnaW4tZWxlY3Ryb24nXHJcbmltcG9ydCBwa2cgZnJvbSAnLi9wYWNrYWdlLmpzb24nXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcbmltcG9ydCB7IEpTRE9NIH0gZnJvbSAnanNkb20nXHJcbmltcG9ydCBjaGlsZCBmcm9tICdjaGlsZF9wcm9jZXNzJ1xyXG5pbXBvcnQgcHJlYWN0IGZyb20gXCJAcHJlYWN0L3ByZXNldC12aXRlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgYWxpYXMgPSAge1xyXG4gICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXHJcbiAgXCJzcmNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9yZWFjdFwiKSxcclxuICBcIkBlbGVjdHJvblwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL2VsZWN0cm9uXCIpLFxyXG4gIFwiQHN0eWxlc1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL3JlYWN0L3N0eWxlc1wiKSxcclxuICBcIkBzaGFyZWRcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9yZWFjdC9zaGFyZWRcIiksXHJcbiAgXCJARnJvZ2dpZVR5cGVzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi90eXBlc1wiKSxcclxuICBcInJlYWN0XCI6IFwicHJlYWN0L2NvbXBhdFwiLFxyXG4gIFwicmVhY3QtZG9tL3Rlc3QtdXRpbHNcIjogXCJwcmVhY3QvdGVzdC11dGlsc1wiLFxyXG4gIFwicmVhY3QtZG9tXCI6IFwicHJlYWN0L2NvbXBhdFwiLFxyXG4gIFwicmVhY3QvanN4LXJ1bnRpbWVcIjogXCJwcmVhY3QvanN4LXJ1bnRpbWVcIlxyXG59XHJcblxyXG5jb25zdCBhZGRSZWFjdERldlRvb2xzU2NyaXB0UGx1Z2luID0gKCkgPT4gKHtcclxuICBuYW1lOiAnYWRkLXJlYWN0LWRldnRvb2xzLXNjcmlwdCcsXHJcbiAgYXBwbHk6ICdzZXJ2ZScsXHJcbiAgdHJhbnNmb3JtSW5kZXhIdG1sKGh0bWwpIHtcclxuICAgIGNvbnN0IGpzZG9tID0gbmV3IEpTRE9NKGh0bWwpO1xyXG4gICAgY29uc3Qgc2NyaXB0ID0ganNkb20ud2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXHJcbiAgICBzY3JpcHQudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCJcclxuICAgIHNjcmlwdC5zcmMgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA5N1wiXHJcbiAgICBqc2RvbS53aW5kb3cuZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpXHJcbiAgICByZXR1cm4ganNkb20uc2VyaWFsaXplKCkgXHJcbiAgfSxcclxufSBhcyBQbHVnaW4pXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9OiBDb25maWdFbnYpID0+IHtcclxuICBybVN5bmMoJ2Rpc3QnLCB7IHJlY3Vyc2l2ZTogdHJ1ZSwgZm9yY2U6IHRydWUgfSlcclxuXHJcbiAgY29uc3QgaXNEZXYgPSBtb2RlID09PSAnZGV2ZWxvcG1lbnQnXHJcbiAgY29uc3QgaXNCdWlsZCA9IGNvbW1hbmQgPT09ICdidWlsZCdcclxuICBjb25zdCBzb3VyY2VtYXAgPSB0cnVlXHJcblxyXG4gIGNvbnNvbGUubG9nKCdWaXRlIGJ1aWxkJywgbW9kZSwgY29tbWFuZClcclxuXHJcbiAgaWYgKGlzRGV2KSB7XHJcbiAgICBjaGlsZC5leGVjKCducHggcmVhY3QtZGV2dG9vbHMnKVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGJhc2U6ICcnLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAgIGFsaWFzOiBhbGlhcyxcclxuICAgICAgfSxcclxuICAgICAgYnVpbGQ6IHtcclxuICAgICAgICBzb3VyY2VtYXA6IHRydWUsXHJcbiAgICAgICAgb3V0RGlyOiAnLi9idWlsZCcsXHJcbiAgICAgIH0sXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIGlzRGV2ICYmIGFkZFJlYWN0RGV2VG9vbHNTY3JpcHRQbHVnaW4oKSxcclxuICAgICAgcHJlYWN0KHtcclxuICAgICAgICBiYWJlbDoge1xyXG4gICAgICAgICAgY29uZmlnRmlsZTogdHJ1ZSxcclxuICAgICAgICB9XHJcbiAgICAgIH0pLFxyXG4gICAgICBlbGVjdHJvbihbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZW50cnk6ICdzcmMvZWxlY3Ryb24vZWxlY3Ryb24udHMnLFxyXG4gICAgICAgICAgb25zdGFydChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuc3RhcnR1cCgpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdml0ZToge1xyXG4gICAgICAgICAgICBidWlsZDoge1xyXG4gICAgICAgICAgICAgIHNvdXJjZW1hcCxcclxuICAgICAgICAgICAgICBtaW5pZnk6IGlzQnVpbGQsXHJcbiAgICAgICAgICAgICAgb3V0RGlyOiAnYnVpbGQvZWxlY3Ryb24nLFxyXG4gICAgICAgICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIGV4dGVybmFsOiBPYmplY3Qua2V5cygnZGVwZW5kZW5jaWVzJyBpbiBwa2cgPyBwa2cuZGVwZW5kZW5jaWVzIDoge30pLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgIGFsaWFzOiBhbGlhcyxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGVudHJ5OiAnc3JjL2VsZWN0cm9uL3ByZWxvYWQudHMnLFxyXG4gICAgICAgICAgb25zdGFydChhcmdzKSB7XHJcbiAgICAgICAgICAgIC8vIE5vdGlmeSB0aGUgUmVuZGVyZXIgcHJvY2VzcyB0byByZWxvYWQgdGhlIHBhZ2Ugd2hlbiB0aGUgUHJlbG9hZCBzY3JpcHRzIGJ1aWxkIGlzIGNvbXBsZXRlLCBcclxuICAgICAgICAgICAgLy8gaW5zdGVhZCBvZiByZXN0YXJ0aW5nIHRoZSBlbnRpcmUgRWxlY3Ryb24gQXBwLlxyXG4gICAgICAgICAgICBhcmdzLnJlbG9hZCgpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdml0ZToge1xyXG4gICAgICAgICAgICBidWlsZDoge1xyXG4gICAgICAgICAgICAgIHNvdXJjZW1hcDogc291cmNlbWFwID8gJ2lubGluZScgOiB1bmRlZmluZWQsIC8vICMzMzJcclxuICAgICAgICAgICAgICBtaW5pZnk6IGlzQnVpbGQsXHJcbiAgICAgICAgICAgICAgb3V0RGlyOiAnYnVpbGQnLFxyXG4gICAgICAgICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIGV4dGVybmFsOiBPYmplY3Qua2V5cygnZGVwZW5kZW5jaWVzJyBpbiBwa2cgPyBwa2cuZGVwZW5kZW5jaWVzIDoge30pLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgIGFsaWFzOiBhbGlhcyxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9XHJcbiAgICAgIF0pLFxyXG4gICAgXSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICAgIHBvcnQ6IDMwMDAsXHJcbiAgICB9LFxyXG4gICAgY2xlYXJTY3JlZW46IGZhbHNlLFxyXG4gIH1cclxufSkiLCAie1xuICBcIm5hbWVcIjogXCJmcm9nZ2llXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMi4xNFwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiQSBjaGF0IGFwcGxpY2F0aW9uXCIsXG4gIFwibWFpblwiOiBcIi4vYnVpbGQvZWxlY3Ryb24vZWxlY3Ryb24uanNcIixcbiAgXCJob21lcGFnZVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9mcm9nZ2llYXBwL2Zyb2dnaWVcIixcbiAgXCJhdXRob3JcIjoge1xuICAgIFwibmFtZVwiOiBcInZpY29kaW5lZVwiXG4gIH0sXG4gIFwiYnVpbGRcIjoge1xuICAgIFwiYXNhclwiOiB0cnVlLFxuICAgIFwicHJvZHVjdE5hbWVcIjogXCJmcm9nZ2llXCIsXG4gICAgXCJmaWxlc1wiOiBbXG4gICAgICBcImJ1aWxkLyoqLypcIixcbiAgICAgIFwiIW5vZGVfbW9kdWxlc1wiXG4gICAgXSxcbiAgICBcImFwcElkXCI6IFwiY29tLmZyb2dnaWUuYXBwXCIsXG4gICAgXCJtYWNcIjoge1xuICAgICAgXCJjYXRlZ29yeVwiOiBcInB1YmxpYy5hcHAtY2F0ZWdvcnkuc29jaWFsLW5ldHdvcmtpbmdcIixcbiAgICAgIFwiYXJ0aWZhY3ROYW1lXCI6IFwiJHtwcm9kdWN0TmFtZX0tJHt2ZXJzaW9ufS0ke29zfS0ke2FyY2h9LiR7ZXh0fVwiXG4gICAgfSxcbiAgICBcIndpblwiOiB7XG4gICAgICBcInRhcmdldFwiOiBcIm5zaXNcIixcbiAgICAgIFwiYXJ0aWZhY3ROYW1lXCI6IFwiJHtwcm9kdWN0TmFtZX0tJHt2ZXJzaW9ufS0ke29zfS0ke2FyY2h9LiR7ZXh0fVwiXG4gICAgfSxcbiAgICBcImxpbnV4XCI6IHtcbiAgICAgIFwidGFyZ2V0XCI6IFwiQXBwSW1hZ2VcIixcbiAgICAgIFwiYXJ0aWZhY3ROYW1lXCI6IFwiJHtwcm9kdWN0TmFtZX0tJHt2ZXJzaW9ufS0ke29zfS0ke2FyY2h9LiR7ZXh0fVwiLFxuICAgICAgXCJjYXRlZ29yeVwiOiBcIk5ldHdvcmtcIlxuICAgIH0sXG4gICAgXCJwdWJsaXNoXCI6IHtcbiAgICAgIFwicHJvdmlkZXJcIjogXCJnaXRodWJcIixcbiAgICAgIFwicmVwb1wiOiBcImZyb2dnaWVcIixcbiAgICAgIFwib3duZXJcIjogXCJmcm9nZ2llYXBwXCIsXG4gICAgICBcInJlbGVhc2VUeXBlXCI6IFwicmVsZWFzZVwiXG4gICAgfVxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiYnVpbGRcIjogXCJ5YXJuIHZpdGUgYnVpbGRcIixcbiAgICBcImJ1aWxkOmxvY2FsXCI6IFwieWFybiB2aXRlIGJ1aWxkICYmIHlhcm4gYXBwOmRpc3RcIixcbiAgICBcImRldlwiOiBcInZpdGVcIixcbiAgICBcInRlc3Q6ZWxlY3Ryb25cIjogXCJ2aXRlc3QgcnVuIC0tY29uZmlnIC4vdml0ZXN0LmVsZWN0cm9uLmNvbmZpZy50c1wiLFxuICAgIFwidGVzdDpyZWFjdFwiOiBcInZpdGVzdCBydW4gLS1jb25maWcgLi92aXRlc3QucmVhY3QuY29uZmlnLnRzXCIsXG4gICAgXCJsaW50OmZpeFwiOiBcInlhcm4gZXNsaW50IHNyYyAtLWZpeFwiLFxuICAgIFwicHJldHRpZXI6Zml4XCI6IFwieWFybiBwcmV0dGllciBzcmMgLS1jaGVjayAtLXdyaXRlXCIsXG4gICAgXCJmb3JtYXRcIjogXCJ5YXJuIHByZXR0aWVyOmZpeCAmJiB5YXJuIGxpbnQ6Zml4XCIsXG4gICAgXCJ0ZXN0XCI6IFwieWFybiB0c2MgLS1ub0VtaXQgJiYgeWFybiB0ZXN0OmVsZWN0cm9uICYmIHlhcm4gdGVzdDpyZWFjdFwiLFxuICAgIFwiYXBwOmRpclwiOiBcInlhcm4gZWxlY3Ryb24tYnVpbGRlciAtLWRpclwiLFxuICAgIFwiYXBwOmRpc3RcIjogXCJ5YXJuIGVsZWN0cm9uLWJ1aWxkZXJcIixcbiAgICBcInN0b3J5Ym9va1wiOiBcInN0b3J5Ym9vayBkZXYgLXAgNjAwNlwiLFxuICAgIFwiYnVpbGQtc3Rvcnlib29rXCI6IFwic3Rvcnlib29rIGJ1aWxkXCIsXG4gICAgXCJnZXQtY2hhbmdlbG9nXCI6IFwibm9kZSAuL2dldENoYW5nZWxvZy5tanNcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAYmFiZWwvY29yZVwiOiBcIl43LjIzLjZcIixcbiAgICBcIkBiYWJlbC9wbHVnaW4tdHJhbnNmb3JtLXJlYWN0LWpzeC1zb3VyY2VcIjogXCJeNy4yMy4zXCIsXG4gICAgXCJAYmFiZWwvcHJlc2V0LWVudlwiOiBcIl43LjIzLjNcIixcbiAgICBcIkBiYWJlbC9wcmVzZXQtcmVhY3RcIjogXCJeNy4yMy4zXCIsXG4gICAgXCJAYmFiZWwvcHJlc2V0LXR5cGVzY3JpcHRcIjogXCJeNy4yMy4zXCIsXG4gICAgXCJAb2N0b2tpdC9yZXN0XCI6IFwiXjIwLjAuMlwiLFxuICAgIFwiQHByZWFjdC9wcmVzZXQtdml0ZVwiOiBcIl4yLjcuMFwiLFxuICAgIFwiQHN0b3J5Ym9vay9hZGRvbi1lc3NlbnRpYWxzXCI6IFwiXjcuNi40XCIsXG4gICAgXCJAc3Rvcnlib29rL2FkZG9uLWludGVyYWN0aW9uc1wiOiBcIl43LjYuNFwiLFxuICAgIFwiQHN0b3J5Ym9vay9hZGRvbi1saW5rc1wiOiBcIl43LjYuNFwiLFxuICAgIFwiQHN0b3J5Ym9vay9hZGRvbi1vbmJvYXJkaW5nXCI6IFwiXjEuMC4xMFwiLFxuICAgIFwiQHN0b3J5Ym9vay9ibG9ja3NcIjogXCJeNy42LjRcIixcbiAgICBcIkBzdG9yeWJvb2svcHJlYWN0LXZpdGVcIjogXCJeNy42LjVcIixcbiAgICBcIkBzdG9yeWJvb2svcmVhY3RcIjogXCJeNy42LjRcIixcbiAgICBcIkBzdG9yeWJvb2svdGVzdFwiOiBcIl43LjYuNFwiLFxuICAgIFwiQHRlc3RpbmctbGlicmFyeS9wcmVhY3RcIjogXCJeMy4yLjNcIixcbiAgICBcIkB0eXBlcy9iYWJlbF9fY29yZVwiOiBcIl43XCIsXG4gICAgXCJAdHlwZXMvamVzdFwiOiBcIl4yOS41LjExXCIsXG4gICAgXCJAdHlwZXMvbWljcm9tb2RhbFwiOiBcIl4wLjMuNVwiLFxuICAgIFwiQHR5cGVzL3JvbGx1cC1wbHVnaW4tcG9zdGNzc1wiOiBcIl4zLjEuNFwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNi4xMy4wXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjYuMTMuMFwiLFxuICAgIFwiQHdlbGxkb25lLXNvZnR3YXJlL3doeS1kaWQteW91LXJlbmRlclwiOiBcIl43LjAuMVwiLFxuICAgIFwiYmFiZWwtamVzdFwiOiBcIl4yOS43LjBcIixcbiAgICBcImVsZWN0cm9uXCI6IFwiXjI4LjAuMFwiLFxuICAgIFwiZWxlY3Ryb24tYnVpbGRlclwiOiBcIl4yNC45LjFcIixcbiAgICBcImVzbGludFwiOiBcIl44LjU2LjBcIixcbiAgICBcImVzbGludC1jb25maWctcHJlYWN0XCI6IFwiXjEuMy4wXCIsXG4gICAgXCJlc2xpbnQtY29uZmlnLXByZXR0aWVyXCI6IFwiXjkuMS4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLWplc3RcIjogXCJeMjcuNi4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXByZXR0aWVyXCI6IFwiXjUuMC4xXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0XCI6IFwiXjcuMzMuMlwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdC1ob29rc1wiOiBcIl40LjYuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdC1wZXJmXCI6IFwiXjMuMy4xXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXN0b3J5Ym9va1wiOiBcIl4wLjYuMTVcIixcbiAgICBcImplc3RcIjogXCJeMjkuNy4wXCIsXG4gICAgXCJqZXN0LWVudmlyb25tZW50LWpzZG9tXCI6IFwiXjI5LjcuMFwiLFxuICAgIFwiamVzdC13ZWJzb2NrZXQtbW9ja1wiOiBcIl4yLjUuMFwiLFxuICAgIFwianNkb21cIjogXCJeMjMuMC4xXCIsXG4gICAgXCJub2RlLWZldGNoXCI6IFwiXjMuMy4yXCIsXG4gICAgXCJwcmV0dGllclwiOiBcIjMuMS4wXCIsXG4gICAgXCJyZWFjdC1kZXZ0b29sc1wiOiBcIl41LjAuMFwiLFxuICAgIFwic3Rvcnlib29rXCI6IFwiXjcuNi40XCIsXG4gICAgXCJ0c2NvbmZpZy1wYXRoc1wiOiBcIl40LjIuMFwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjMuM1wiLFxuICAgIFwidml0ZVwiOiBcIl41LjAuNFwiLFxuICAgIFwidml0ZS1wbHVnaW4tY29tbW9uanNcIjogXCJeMC4xMC4xXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1lbGVjdHJvblwiOiBcIl4wLjE1LjRcIixcbiAgICBcInZpdGUtcGx1Z2luLWVsZWN0cm9uLXJlbmRlcmVyXCI6IFwiXjAuMTQuNVwiLFxuICAgIFwidml0ZXN0XCI6IFwiXjEuMS4wXCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGVtb2ppLW1hcnQvZGF0YVwiOiBcIl4xLjEuMlwiLFxuICAgIFwiQGhlcm9pY29ucy9yZWFjdFwiOiBcIl4yLjAuMThcIixcbiAgICBcIkBsZXhpY2FsL3JlYWN0XCI6IFwiXjAuMTIuNVwiLFxuICAgIFwiQGxleGljYWwvdXRpbHNcIjogXCJeMC4xMi41XCIsXG4gICAgXCJAdGFibGVyL2ljb25zLXJlYWN0XCI6IFwiXjIuNDQuMFwiLFxuICAgIFwiQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5XCI6IFwiXjUuMTIuMlwiLFxuICAgIFwiQHRhbnN0YWNrL3JlYWN0LXZpcnR1YWxcIjogXCJeMy4wLjFcIixcbiAgICBcImRlYm91bmNlXCI6IFwiXjIuMC4wXCIsXG4gICAgXCJpbW1lclwiOiBcIl4xMC4wLjNcIixcbiAgICBcImxleGljYWxcIjogXCJeMC4xMi41XCIsXG4gICAgXCJtaWNyb21vZGFsXCI6IFwiXjAuNC4xMFwiLFxuICAgIFwicHJlYWN0XCI6IFwiXjEwLjE5LjNcIixcbiAgICBcInJlYWN0LWVhc3ktZW1vamlcIjogXCJeMS44LjFcIixcbiAgICBcInJlYWN0LXRvYXN0aWZ5XCI6IFwiXjkuMS4zXCIsXG4gICAgXCJyZWFjdC10b29sdGlwXCI6IFwiXjUuMjUuMFwiLFxuICAgIFwicmVhY3QtdXNlLWRyYWdnYWJsZS1zY3JvbGxcIjogXCJeMC40LjdcIixcbiAgICBcInJlYWN0LXZpcnR1b3NvXCI6IFwiXjQuNi4yXCIsXG4gICAgXCJ0d2Vtb2ppLXJlYWN0LWFzc2V0c1wiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9mcm9nZ2llYXBwL3R3ZW1vamktcmVhY3QtYXNzZXRzXCIsXG4gICAgXCJ3b3V0ZXItcHJlYWN0XCI6IFwiXjIuMTIuMlwiLFxuICAgIFwienVzdGFuZFwiOiBcIl40LjQuNlwiXG4gIH0sXG4gIFwicGFja2FnZU1hbmFnZXJcIjogXCJ5YXJuQDQuMC4yXCIsXG4gIFwicmVzb2x1dGlvbnNcIjoge1xuICAgIFwicmVhY3RcIjogXCJucG06QHByZWFjdC9jb21wYXRAKlwiLFxuICAgIFwicmVhY3QtZG9tXCI6IFwibnBtOkBwcmVhY3QvY29tcGF0QCpcIlxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdULFNBQVMsY0FBYztBQUMvVSxTQUE0QixvQkFBb0I7QUFDaEQsT0FBTyxjQUFjOzs7QUNGckI7QUFBQSxFQUNFLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxFQUNY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
