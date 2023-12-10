import React from "react";
import "@styles/Config.css";

export const Config = () => {
  return (
    <div className="config">
      <button type="button" onClick={window.electronAPI.openKickPage} className="primary-btn">
        Log in to Kick
      </button>
    </div>
  );
};
