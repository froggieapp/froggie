import "./index.css";
import { h } from "preact";
import { EmoteTooltip } from "../EmoteTooltip";

export interface DefaultEmoteProps {
  src: string;
  name: string;
}

export const DefaultEmote: React.FC<DefaultEmoteProps> = ({ src, name }) => {
  return (
    <EmoteTooltip className="emote-wrapper" position="top" emoteSrc={src} label={name}>
      <img className="emote" src={src} alt={name} />
    </EmoteTooltip>
  );
};
