import React from "react";
import { MinusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import "./index.css";

export const Toolbar = () => {
  const handleClose = (e: MouseEvent) => {
    e.preventDefault();
    window.electronAPI.close();
  };

  return (
    <div className="toolbar">
      <div className="toolbar-left-side">Kickerino</div>
      <div className="toolbar-right-side">
        <button type="button" id="minimizeBtn" onClick={handleClose}>
          <MinusIcon className="icon" />
        </button>
        <button type="button" id="closeBtn" onClick={handleClose}>
          <XMarkIcon className="icon" />
        </button>
      </div>
    </div>
  );
};
