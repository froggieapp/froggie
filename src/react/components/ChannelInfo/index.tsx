import React from "react";
import { Avatar } from "../Avatar";
import "./index.css";

interface ChannelInfoProps {
  name: string;
  avatar: string;
}

export const ChannelInfo: React.FC<ChannelInfoProps> = ({ name, avatar }) => {
  return (
    <div className="channel-info">
      <Avatar className="channel-profile" alt={`${name}'s avatar`} src={avatar} />
      <span className="channel-name">{name}</span>
    </div>
  );
};
