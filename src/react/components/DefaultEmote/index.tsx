import React from "react";
import "./index.css";
import { Tooltip } from "../Tooltip";
import { EmoteTooltipContent } from "../EmoteTooltipContent";

interface DefaultEmoteProps {
  src: string;
  name: string;
}

export const DefaultEmote: React.FC<DefaultEmoteProps> = ({ src, name }) => {
  return (
    <Tooltip
      tag="span"
      className="emote-wrapper"
      position="top"
      tooltipClassname="emote-tooltip"
      label={<EmoteTooltipContent emoteSrc={src} name={name} />}
    >
      <img className="emote" src={src} alt={name} />
    </Tooltip>
  );
};
