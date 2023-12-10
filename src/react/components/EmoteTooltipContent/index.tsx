import React from "react";
import "./index.css";

interface EmoteTooltipContentProps {
  emoteSrc: string;
  name: string;
}

export const EmoteTooltipContent: React.FC<EmoteTooltipContentProps> = ({ name, emoteSrc }) => {
  return (
    <div className="emote-tooltip-preview">
      <img src={emoteSrc} alt={name} />
      <p>{name}</p>
    </div>
  );
};
