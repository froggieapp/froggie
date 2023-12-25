import { h } from "preact";
import { ChannelAvatar } from "../ChannelAvatar";
import { StoreChannel } from "src/store/createChannelsStore";
import { NewChannelButton } from "../NewChannelButton";
import "./index.css";
import { useLocation } from "wouter-preact";
import { usePrevLocation } from "@/react/hooks/usePrevLocation";
import { ArrowUturnLeftIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconAt, IconHome, IconHome2 } from "@tabler/icons-react";
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
    <div className="channel-list">
      <Tooltip position="right" label={'Home'}>
      <button className='home-icon-wrapper saved-channel light-shadow' type="button" onClick={onClickSettings}>
          <IconAt className="home-icon" />
        </button></Tooltip>
      {channels.map((c) => (
        <ChannelAvatar key={c.name} name={c.name} avatar={c.avatar} />
      ))}
      <NewChannelButton />
    </div>
  );
};
