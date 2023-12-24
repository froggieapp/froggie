import { h } from "preact";
import "@styles/Config.css";

export const Config = () => {
  const onClick = () => {
    window.electronAPI.openKickPage();
  };
  return (
    <div className="config">
      <button type="button" onClick={onClick} className="primary-btn">
        Log in to Kick
      </button>
    </div>
  );
};
