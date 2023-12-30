import { h } from "preact";
import "@styles/pages/Config.css";

export const Config = () => {
  const onClick = () => {
    window.electronAPI.openKickPage();
  };
  return (
    <div className="fgr-Config">
      <button type="button" onClick={onClick} className="primary-btn">
        Log in to Kick
      </button>
    </div>
  );
};
