import { h } from "preact";
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
    <Tooltip className="fgr-ChannelAvatar u-borderTransition u-shadowSm u-avatarSize" position="right" label={name}>
      <Link href={`/channel/${name}`}>
        <a data-id={contexts.CHANNEL_AVATAR} data-channel={name}>
          <Avatar
            name={name}
            src={avatar}
            alt={`${name}'s channel picture`}
            className="fgr-ChannelAvatar-avatar u-pointerNone"
          />
        </a>
      </Link>
    </Tooltip>
  );
};
