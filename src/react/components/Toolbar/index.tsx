import React from "react";
import "./index.css";
import { IconMaximize, IconMinus, IconX } from "@tabler/icons-react";

export const Toolbar = () => {
  const handleClose = (e: MouseEvent) => {
    e.preventDefault();
    window.electronAPI.close();
  };

  const handleMaximize = (e: MouseEvent) => {
    e.preventDefault();
    window.electronAPI.maximize();
  };

  const handleMinimize = (e: MouseEvent) => {
    e.preventDefault();
    window.electronAPI.minimize();
  };

  return (
    <div className="toolbar">
      <div className="toolbar-left-side">Kickerino</div>
      <div className="toolbar-right-side">
        <button type="button" id="minimizeBtn" onClick={handleMinimize}>
          <IconMinus className="icon" />
        </button>
        <button type="button" id="maximizeBtn" onClick={handleMaximize}>
          <IconMaximize className="icon" />
        </button>
        <button type="button" id="closeBtn" onClick={handleClose}>
          <IconX className="icon" />
        </button>
      </div>
    </div>
  );
};
