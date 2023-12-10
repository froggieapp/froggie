import electron, { BrowserWindow, Menu } from "electron";
import constants from "src/shared/constants";
import contexts from "@shared/contexts";
import contextCommands from "@shared/contextCommands";

const ipcMain = electron.ipcMain;

const defaultTemplate: (Electron.MenuItemConstructorOptions | Electron.MenuItem)[] = [
  {
    label: "Copy",
    role: "copy",
  },
  {
    label: "Paste",
    role: "paste",
  },
];

const channelAvatarTemplate = (attribs: Record<string, string>) =>
  Menu.buildFromTemplate([
    {
      label: "Remove",
      click: (_, browserWindow) =>
        browserWindow?.webContents?.send(constants.CONTEXT_MENU_COMMAND, contextCommands.REMOVE_CHANNEL, attribs),
    },
  ]);

ipcMain.on(constants.SHOW_CONTEXT_MENU, (event, data) => {
  const clonedData = { ...data };
  const elId = clonedData?.id;
  let menu = Menu.buildFromTemplate(defaultTemplate);
  switch (elId) {
    case contexts.CHANNEL_AVATAR: {
      menu = channelAvatarTemplate(clonedData);
      break;
    }
  }
  menu.popup({ window: BrowserWindow.fromWebContents(event.sender) || undefined });
});
