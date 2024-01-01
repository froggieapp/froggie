import { rmSync } from 'node:fs'
import { ConfigEnv, Plugin, defineConfig } from 'vite'
import electron from 'vite-plugin-electron'
import pkg from './package.json'
import path from 'path'
import { JSDOM } from 'jsdom'
import child from 'child_process'
import preact from "@preact/preset-vite";
import { esbuildCommonjs, viteCommonjs } from '@originjs/vite-plugin-commonjs'

export const alias =  {
  '@': path.resolve(__dirname, './src'),
  "src": path.resolve(__dirname, "./src/react"),
  "@electron": path.resolve(__dirname, "./src/electron"),
  "@styles": path.resolve(__dirname, "./src/react/styles"),
  "@shared": path.resolve(__dirname, "./src/react/shared"),
  "@FroggieTypes": path.resolve(__dirname, "./types"),
  "react": "preact/compat",
  "react-dom/test-utils": "preact/test-utils",
  "react-dom": "preact/compat",
  "react/jsx-runtime": "preact/jsx-runtime"
}

const addReactDevToolsScriptPlugin = () => ({
  name: 'add-react-devtools-script',
  apply: 'serve',
  transformIndexHtml(html) {
    const jsdom = new JSDOM(html);
    const script = jsdom.window.document.createElement('script')
    script.type = "text/javascript"
    script.src = "http://localhost:8097"
    jsdom.window.document.head.appendChild(script)
    return jsdom.serialize() 
  },
} as Plugin)

export default defineConfig(({ command, mode }: ConfigEnv) => {
  const isDev = mode === 'development'
  if (!isDev)
    rmSync('dist', { recursive: true, force: true });

  const isBuild = command === 'build'
  const sourcemap = true

  console.log('Vite build', mode, command)

  if (isDev) {
    child.exec('npx react-devtools')
  }

  return {
    base: '',
    resolve: {
        alias: alias,
      },
      build: {
        sourcemap: true,
        outDir: './build',
      },
      optimizeDeps: {
        esbuildOptions: {
          plugins:[
            esbuildCommonjs(['@capsizecss/metrics']) 
          ]
        }
      },
    plugins: [
      isDev && addReactDevToolsScriptPlugin(),
      viteCommonjs(),
      preact({
        babel: {
          configFile: true,
        }
      }),
      electron([
        {
          entry: 'src/electron/electron.ts',
          onstart(options) {
            options.startup()
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: 'build/electron',
              rollupOptions: {
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
              },
            },
            resolve: {
                alias: alias,
              },
          },
        },
        {
          entry: 'src/electron/preload.ts',
          onstart(args) {
            // Notify the Renderer process to reload the page when the Preload scripts build is complete, 
            // instead of restarting the entire Electron App.
            args.reload()
          },
          vite: {
            build: {
              sourcemap: sourcemap ? 'inline' : undefined, // #332
              minify: isBuild,
              outDir: 'build',
              rollupOptions: {
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
              },
            },
            resolve: {
                alias: alias,
              },
          },
        }
      ]),
    ],
    server: {
        port: 3000,
    },
    clearScreen: false,
  }
})