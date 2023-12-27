/// import "./wdyr";
import { h, render } from "preact";
import { App } from "./App";
import "./styles/global.css";
import { initializeStore, useStore } from "./store/Store";

const forsen = async () => {
  const settings = await window.electronAPI.settings();
  initializeStore({
    eventChannels: {},
    channels: settings?.channels || [],
  });
  if (!useStore) throw new Error("No store found");
  render(<App />, document.getElementById("root") as HTMLElement);
};

forsen();
