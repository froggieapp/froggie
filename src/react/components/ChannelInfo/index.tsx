import { h } from "preact";
import { Avatar } from "../Avatar";
import "./index.css";

interface ChannelInfoProps {
  name: string;
  avatar: string;
}

export const ChannelInfo: React.FC<ChannelInfoProps> = ({ name, avatar }) => {
  const onOpen = () => {
    window.electronAPI.openBrowser(`https://kick.com/${name}`);
  };
  return (
    <div className="fgr-ChannelInfo">
      <button type="button" className="fgr-ChannelInfo-button" onClick={onOpen}>
        <Avatar
          className="fgr-ChannelInfo-avatar u-shadowSm u-avatarSize"
          name={name}
          alt={`${name}'s avatar`}
          src={avatar}
        />
        <span className="fgr-ChannelInfo-name">{name}</span>
      </button>
    </div>
  );
};
