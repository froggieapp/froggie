import { h } from "preact";
import { ChannelList } from "../ChannelList";
import { useStore } from "src/store/Store";
import "./index.css";

export const Sidebar = () => {
  const channels = useStore((state) => state.channels);

  return (
    <div className="fgr-Sidebar">
      <ChannelList channels={channels} />
    </div>
  );
};
