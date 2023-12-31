import { BrowserWindow } from "electron";
import { filterKickHeaders } from "../utils/filterKickHeaders";
import constants from "@/react/shared/constants";
import { getCurrentUrl } from "../utils/util";

const createWindow = (mainWindow: BrowserWindow) => {
  const kickPage = new BrowserWindow({
    autoHideMenuBar: false,
    modal: false,
    show: false,
    width: 600,
    height: 600,
    frame: true,
    transparent: false,
    hasShadow: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      session: mainWindow.webContents.session,
    },
  });
  filterKickHeaders(kickPage, getCurrentUrl());
  kickPage.loadURL("https://kick.com/terms-of-service");
  kickPage.once("ready-to-show", () => {
    kickPage.show();
    if (process.env.VITE_DEV_SERVER_URL) {
      kickPage.webContents.openDevTools();
    }
  });
  kickPage.once("closed", () => {
    mainWindow.webContents.send(constants.CLOSE_KICK_PAGE);
  });
};

export const kickWindow = {
  createWindow,
};
