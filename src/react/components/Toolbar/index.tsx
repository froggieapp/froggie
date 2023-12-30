import { h } from "preact";
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
    <div className="fgr-Toolbar">
      <div className="fgr-Toolbar-leftSide">Froggie</div>
      <div className="fgr-Toolbar-rightSide">
        <button className="fgr-Toolbar-button" type="button" id="minimizeBtn" onClick={handleMinimize}>
          <IconMinus className="fgr-Toolbar-icon" />
        </button>
        <button className="fgr-Toolbar-button" type="button" id="maximizeBtn" onClick={handleMaximize}>
          <IconMaximize className="fgr-Toolbar-icon" />
        </button>
        <button className="fgr-Toolbar-button" type="button" id="closeBtn" onClick={handleClose}>
          <IconX className="fgr-Toolbar-icon" />
        </button>
      </div>
    </div>
  );
};
