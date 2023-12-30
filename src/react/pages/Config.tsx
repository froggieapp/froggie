import { h } from "preact";
import "@styles/pages/Config.css";
import { Button } from "../components/Button";

export const Config = () => {
  const onClick = () => {
    window.electronAPI.openKickPage();
  };
  return (
    <div className="fgr-Config">
      <Button onClick={onClick}>Log in to Kick</Button>
    </div>
  );
};
