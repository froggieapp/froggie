import { BrowserWindow } from "electron";
import { prodServer } from "../serve";
import { AddressInfo } from "net";

export const updateRequestHeaders = <T extends string | string[]>(
  requestHeaders: Record<string, T>,
  value: Record<string, T>,
) => {
  const result: Record<string, T> = { ...value };
  const requestHeaderEntries = Object.entries(requestHeaders);
  const valueKeysEntries = Object.entries(result);

  for (let i = 0; i < requestHeaderEntries.length; i += 1) {
    const [headerKey] = requestHeaderEntries[i];
    for (let j = 0; j < valueKeysEntries.length; j += 1) {
      const [valueKey, value] = valueKeysEntries[j];
      if (valueKey.toLowerCase() === headerKey.toLowerCase()) {
        delete result[valueKey];
        result[headerKey] = value;
      }
    }
  }

  return {
    ...requestHeaders,
    ...result,
  };
};

export const getCurrentUrl = () => {
  if (process.env.VITE_DEV_SERVER_URL) {
    return "http://localhost:3000";
  }
  const { port } = prodServer?.address() as AddressInfo;
  return `http://localhost:${port}`;
};

export const loadLocalURL = (
  browserWindow: BrowserWindow,
  url: {
    path: string;
  },
) => {
  const formattedPath = url.path ? `/${url.path}` : "";
  browserWindow.loadURL(`${getCurrentUrl()}${formattedPath}`);
};
