import { ComponentChildren, h } from "preact";
import { PlacesType } from "react-tooltip";
import { EMOTE_TOOLTIP } from "@/react/util/tooltips";

type TooltipProps = {
  label: string;
  children?: ComponentChildren;
  position: PlacesType;
  className?: string;
  emoteSrc: string;
};

export const EmoteTooltip = ({ label, children = null, position, emoteSrc, className }: TooltipProps) => {
  return (
    <span
      data-tooltip-id={EMOTE_TOOLTIP}
      data-emote-src={emoteSrc}
      data-tooltip-content={label}
      data-tooltip-place={position}
      className={className}
    >
      {children}
    </span>
  );
};
