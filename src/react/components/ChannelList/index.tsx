import { h } from "preact";
import { ChannelAvatar } from "../ChannelAvatar";
import { StoreChannel } from "src/store/createChannelsStore";
import { NewChannelButton } from "../NewChannelButton";
import "./index.css";
import { useLocation } from "wouter-preact";
import { usePrevLocation } from "@/react/hooks/usePrevLocation";
import { IconAt } from "@tabler/icons-react";
import { Tooltip } from "../Tooltip";

interface ChannelListProps {
  channels: StoreChannel[];
}

export const ChannelList: React.FC<ChannelListProps> = ({ channels }) => {
  const [location, setLocation] = useLocation();
  const prev = usePrevLocation();
  const isConfigPage = location.includes("config");
  const onClickSettings = () => {
    if (isConfigPage) {
      setLocation(prev ? prev : "/");
      return;
    }
    setLocation("/config");
  };

  return (
    <div className="fgr-ChannelList">
      <Tooltip position="right" label={"Home"}>
        <button
          data-testid="home-button"
          className="u-relative u-avatarSize fgr-ChannelList-button u-shadowSm u-borderTransition"
          type="button"
          onClick={onClickSettings}
        >
          <IconAt className="fgr-ChannelList-icon" />
        </button>
      </Tooltip>
      {channels.map((c) => (
        <ChannelAvatar key={c.name} name={c.name} avatar={c.avatar} />
      ))}
      <NewChannelButton />
    </div>
  );
};
