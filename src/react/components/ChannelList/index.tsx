import React from "react";
import { ChannelAvatar } from "../ChannelAvatar";
import { StoreChannel } from "src/store/createChannelsStore";
import { NewChannelButton } from "../NewChannelButton";
import "./index.css";

interface ChannelListProps {
  channels: StoreChannel[];
}

export const ChannelList: React.FC<ChannelListProps> = ({ channels }) => {
  return (
    <div className="channel-list">
      {channels.map((c) => (
        <ChannelAvatar key={c.name} name={c.name} avatar={c.avatar} />
      ))}
      <NewChannelButton />
    </div>
  );
};
