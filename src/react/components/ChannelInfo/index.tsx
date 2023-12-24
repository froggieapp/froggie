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
    <div className="channel-info">
      <button type="button" className="user-info" onClick={onOpen}>
        <Avatar className="channel-profile" name={name} alt={`${name}'s avatar`} src={avatar} />
        <span className="channel-name">{name}</span>
      </button>
    </div>
  );
};
