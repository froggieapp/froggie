declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}

export interface IElectronAPI {
  close: () => void
  openKickPage: () => void
  addChannel: (data: Omit<UserSettings.SettingsChannel, 'order'>) => Promise<void>
  removeChannel: (name: string) => Promise<void>
  receive: (channel: keyof typeof constants, cb: (...args: any[]) => void) => void
  removeAllListeners: (channel: string) => void,
  settings: () => Promise<UserSettings.UserSettingsData | undefined | null>
}
