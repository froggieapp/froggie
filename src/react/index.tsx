import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";
import { initializeStore, useStore } from "./store/Store";

const forsen = async () => {
  const settings = await window.electronAPI.settings();
  initializeStore({
    events: {},
    channels: settings?.channels || [],
  });
  if (!useStore) throw new Error("No store found");
  const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
};

forsen();
