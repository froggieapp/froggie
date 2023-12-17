import React from "react";
import { Avatar } from "../Avatar";
import { Tooltip } from "../Tooltip";
import "./index.css";
import { Link } from "wouter-preact";
import contexts from "@shared/contexts";

interface ChannelAvatarProps {
  name: string;
  avatar: string | null | undefined;
}

export const ChannelAvatar: React.FC<ChannelAvatarProps> = ({ name, avatar }) => {
  return (
    <Tooltip position="right" label={name}>
      <Link className="saved-channel-link" href={`/channel/${name}`}>
        <a data-id={contexts.CHANNEL_AVATAR} data-channel={name}>
          <Avatar name={name} src={avatar} className="saved-channel channel-avatar" alt={`${name}'s channel picture`} />
        </a>
      </Link>
    </Tooltip>
  );
};
