import electron from "electron";
import { updateRequestHeaders } from "./util";

const filter = {
  urls: ["https://*.kick.com/*", "https://kick.com/*"],
};

export const filterKickHeaders = (win: electron.BrowserWindow, url: string) => {
  win.webContents.session.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
    callback({
      requestHeaders: updateRequestHeaders(details.requestHeaders, {
        Origin: "https://kick.com",
        Referer: "https://kick.com",
      }),
    });
  });

  win.webContents.session.webRequest.onHeadersReceived(filter, (details, callback) => {
    const isPreflight = details.method === "OPTIONS";
    const setHeaders: Record<string, string | string[]> = {
      Origin: url,
      Referer: url,
      "Access-Control-Allow-Origin": [url],
      "Access-Control-Allow-Credentials": "true",
      "Set-Cookie":
        details.responseHeaders?.["set-cookie"]?.map(
          // TODO: this may break a lot of stuuff, should replacce secure if exist instead of just add it
          (c) => c.replace("samesite=lax", `secure=true;samesite=none`),
        ) ?? "",
    };
    const headersResponse: Electron.HeadersReceivedResponse = {
      responseHeaders: updateRequestHeaders(details.responseHeaders || {}, setHeaders),
    };
    if (isPreflight) {
      headersResponse.statusLine = "200";
    }
    callback(headersResponse);
  });
};
