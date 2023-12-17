/// import "./wdyr";
import React from "react";
import { App } from "./App";
import "./styles/global.css";
import { initializeStore, useStore } from "./store/Store";
import { render } from "preact";

const forsen = async () => {
  const settings = await window.electronAPI.settings();
  initializeStore({
    events: {},
    channels: settings?.channels || [],
  });
  if (!useStore) throw new Error("No store found");
  render(<App />, document.getElementById("root") as HTMLElement);
};

forsen();
