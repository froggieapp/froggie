import React from "react";
import { ComponentChildren } from "preact";
import { PlacesType } from "react-tooltip";
import { EMOTE_TOOLTIP } from "@/react/util/tooltips";

type TooltipProps = {
  label: string;
  children?: ComponentChildren;
  position: PlacesType;
  tooltipClassname?: string;
  emoteSrc: string;
};

export const EmoteTooltip = ({ label, children = null, position, emoteSrc }: TooltipProps) => {
  return (
    <span
      data-tooltip-id={EMOTE_TOOLTIP}
      data-emote-src={emoteSrc}
      data-tooltip-content={label}
      data-tooltip-place={position}
    >
      {children}
    </span>
  );
};
