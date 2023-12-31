/// import "./wdyr";
import { h, render } from "preact";
import { App } from "./App";
import "./styles/global.css";
import "./styles/utilities/index";
import { initializeStore, useStore } from "./store/Store";
import { loadFont } from "./util/util";

const forsen = async () => {
  const settings = await window.electronAPI.settings();
  initializeStore({
    eventChannels: {},
    channels: settings?.channels || [],
  });
  if (!useStore) throw new Error("No store found");
  loadFont("u-messageBodyFont", "Roboto", 12);
  render(<App />, document.getElementById("root") as HTMLElement);
};

forsen();
