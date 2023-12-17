import "./index.css";
import React from "react";
import { EmoteTooltip } from "../EmoteTooltip";

interface DefaultEmoteProps {
  src: string;
  name: string;
}

export const DefaultEmote: React.FC<DefaultEmoteProps> = ({ src, name }) => {
  return (
    <EmoteTooltip position="top" emoteSrc={src} label={name}>
      <span className="emote-wrapper">
        <img className="emote" src={src} alt={name} />
      </span>
    </EmoteTooltip>
  );
};
