import { h, ComponentChildren } from "preact";
import { PlacesType } from "react-tooltip";
import { GLOBAL_TOOLTIP } from "@/react/util/tooltips";

type TooltipProps = {
  label: string;
  children?: ComponentChildren;
  position: PlacesType;
  className?: string;
};

export const Tooltip = ({ label, children = null, position, className }: TooltipProps) => {
  return (
    <p
      data-tooltip-id={GLOBAL_TOOLTIP}
      className={className}
      data-tooltip-content={label}
      data-tooltip-place={position}
    >
      {children}
    </p>
  );
};
