import React from "react";
import "./index.css";
import { Tooltip } from "../Tooltip";
import { EmoteTooltipContent } from "../EmoteTooltipContent";

interface DefaultEmoteProps {
  src: string;
  name: string;
}

export const DefaultEmote: React.FC<DefaultEmoteProps> = ({ src, name }) => {
  const EmoteTooltip = React.useMemo(() => <EmoteTooltipContent emoteSrc={src} name={name} />, [src, name]);
  return (
    <Tooltip tag="span" className="emote-wrapper" position="top" tooltipClassname="emote-tooltip" label={EmoteTooltip}>
      <img className="emote" src={src} alt={name} />
    </Tooltip>
  );
};
