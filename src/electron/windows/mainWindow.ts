import { BrowserWindow } from "electron";
import path from "path";
import { filterKickHeaders } from "../utils/filterKickHeaders";
import { settings } from "../settings";
import { getCurrentUrl, isOverlayMode, loadLocalURL } from "../utils/util";

export const createMainWindow = () => {
  const browserWindow = new BrowserWindow({
    autoHideMenuBar: true,
    height: 600,
    width: 800,
    minWidth: 400,
    minHeight: 400,
    frame: false,
    transparent: isOverlayMode,
    hasShadow: !isOverlayMode,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "../preload.js"),
    },
  });

  const currentUrl = getCurrentUrl();
  filterKickHeaders(browserWindow, currentUrl);

  browserWindow.webContents.session.cookies.on("changed", (_, cookie) => {
    if (cookie.name === "XSRF-TOKEN" && cookie.domain === ".kick.com") {
      const copiedCookie: Electron.CookiesSetDetails = {
        ...cookie,
        url: currentUrl,
      };
      delete copiedCookie.domain;
      browserWindow?.webContents.session.cookies.set(copiedCookie);
    }
  });

  const channels = settings.data?.channels;
  const initialChannel = channels?.length ? channels[0] : null;
  if (!isOverlayMode) {
    loadLocalURL(browserWindow, {
      path: initialChannel ? `channel/${initialChannel.name}` : "",
    });
  } else {
    loadLocalURL(browserWindow, { path: "overlay" });
  }
  if (process.env.VITE_DEV_SERVER_URL) {
    // browserWindow.webContents.session.clearCache();
    // browserWindow.webContents.session.clearStorageData();
    browserWindow.webContents.openDevTools();
  }
  return browserWindow;
};
