// eslint-disable-next-line @typescript-eslint/no-var-requires
const { contextBridge, ipcRenderer } = require("electron/renderer");
import constants from "@shared/constants";

window.addEventListener(
  "contextmenu",
  (e: MouseEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    ipcRenderer.send(constants.SHOW_CONTEXT_MENU, Object.assign({}, target.dataset));
  },
  false,
);

contextBridge.exposeInMainWorld("electronAPI", {
  close: () => ipcRenderer.invoke(constants.CLOSE),
  openKickPage: () => ipcRenderer.send(constants.OPEN_KICK_PAGE),
  removeChannel: async (name: string) => {
    const settings = (await ipcRenderer.invoke(constants.GET_SETTINGS)) as UserSettings.UserSettingsData | undefined;
    const result = settings?.channels?.filter((c) => c.name !== name) ?? [];
    ipcRenderer.send(constants.SET_SETTING, { key: "channels", value: result });
  },
  addChannel: async (data: Omit<UserSettings.SettingsChannel, "order">) => {
    const settings = (await ipcRenderer.invoke(constants.GET_SETTINGS)) as UserSettings.UserSettingsData | undefined;
    const payload = {
      ...data,
      order: !settings?.channels ? 1 : settings.channels.length + 1,
    };
    if (!settings?.channels) {
      ipcRenderer.send(constants.SET_SETTING, { key: "channels", value: [payload] });
    } else if (settings?.channels && !settings?.channels?.some((c) => c.name === data.name)) {
      ipcRenderer.send(constants.SET_SETTING, { key: "channels", value: [...settings.channels, payload] });
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  receive: (channel: keyof typeof constants, cb: (...args: any[]) => void) => {
    const validChannels = Object.values(constants);
    const channelValue = constants[channel];
    if (validChannels.includes(channelValue)) {
      ipcRenderer.on(channelValue, (_, ...args) => cb(...args));
    }
  },
  removeAllListeners: (channel: string) => {
    ipcRenderer.removeAllListeners(channel);
  },
  settings: () => ipcRenderer.invoke(constants.GET_SETTINGS),
});
