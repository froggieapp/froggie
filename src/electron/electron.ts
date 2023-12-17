import electron from "electron";
import constants from "@shared/constants";
import { settings } from "./settings";
import "./contextMenu";
import { createMainWindow } from "./windows/mainWindow";
import { kickWindow } from "./windows/kickWindow";
import { Serve } from "./serve";

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

let mainWindow: electron.BrowserWindow;

Serve();

app.whenReady().then(() => {
  mainWindow = createMainWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) mainWindow = createMainWindow();
  });

  ipcMain.handle(constants.GET_SETTINGS, () => {
    return settings.data;
  });

  ipcMain.on(constants.SET_SETTING, async (_, { key, value }) => {
    settings.SetValue(key, value);
  });

  ipcMain.handle(constants.CLOSE, (e) => {
    try {
      e.sender.close();
    } catch(e) {
      console.error(e)
    }
  });

  ipcMain.on(constants.OPEN_KICK_PAGE, async () => {
    kickWindow.createWindow(mainWindow);
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
