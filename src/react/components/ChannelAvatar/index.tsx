import React from "react";
import contexts from "@shared/contexts";
import { Avatar } from "../Avatar";
import { Tooltip } from "../Tooltip";
import { useNavigate } from "react-router-dom";
import "./index.css";

interface ChannelAvatarProps {
  name: string;
  avatar: string | null | undefined;
}

export const ChannelAvatar: React.FC<ChannelAvatarProps> = ({ name, avatar }) => {
  const navigate = useNavigate();
  const onClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    navigate(`/channel/${name}`);
  };
  return (
    <Tooltip
      tag="button"
      position="right"
      label={name}
      data-channel={name}
      data-id={contexts.CHANNEL_AVATAR}
      type="button"
      className="saved-channel"
      onClick={onClick}
    >
      <Avatar src={avatar} className="channel-avatar" alt={`${name}'s channel picture`} />
    </Tooltip>
  );
};
