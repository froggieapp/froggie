import { findLatestBuild, parseElectronApp } from 'electron-playwright-helpers';
import { ElectronApplication, Page, _electron as electron } from 'playwright'

export class FroggiePage {
  electronApp: ElectronApplication
  appWindow: Page
  isReady: Promise<unknown>

  constructor() {
    this.isReady = new Promise(async (resolve, reject) => {
        try {
            await this.load()
            resolve(true)
        } catch(e) {
            reject(e)
        }
    })
  }
  
  async load() {
    const latestBuild = findLatestBuild('dist')
    const appInfo = parseElectronApp(latestBuild)
    this.electronApp = await electron.launch({
        args: [appInfo.main],
        executablePath: appInfo.executable
      })
    this.appWindow = await this.electronApp.firstWindow()
    this.electronApp.on('window', async (page) => {
        const url = page.url()?.split('/').pop()
        console.log(`Window opened: ${url}`)
    
        page.on('pageerror', (error) => {
          console.error(error)
        })
        page.on('console', (msg) => {
          console.log(msg.text())
        })
      })
    
  }
  
  async cleanup() {
    await this.electronApp.close()
  }
}