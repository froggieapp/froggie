import { rmSync } from 'node:fs'
import { ConfigEnv, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import pkg from './package.json'
import path from 'path'

export default defineConfig(({ command, mode }: ConfigEnv) => {
  rmSync('dist', { recursive: true, force: true })

  const isDev = mode === 'development'
  const isBuild = command === 'build'
  const sourcemap = true

  const alias =  {
    '@': path.resolve(__dirname, './src'),
    "src": path.resolve(__dirname, "./src/react"),
    "@electron": path.resolve(__dirname, "./src/electron"),
    "@styles": path.resolve(__dirname, "./src/react/styles"),
    "@shared": path.resolve(__dirname, "./src/react/shared"),
    "@KickerinoTypes": path.resolve(__dirname, "./types")
  }

  return {
    base: '',
    resolve: {
        alias: alias,
      },
      build: {
        sourcemap: true,
        outDir: './build'
      },
    plugins: [
      react({
        jsxImportSource: isDev ? '@welldone-software/why-did-you-render' : 'react',
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
      renderer(),
    ],
    server: {
        port: 3000,
    },
    clearScreen: false,
  }
})