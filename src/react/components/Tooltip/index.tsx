import React from "react";
import "./index.css";
import { ComponentChildren } from "preact";
import { PlacesType } from "react-tooltip";
import { GLOBAL_TOOLTIP } from "@/react/util/tooltips";

type TooltipProps = {
  label: string;
  children?: ComponentChildren;
  position: PlacesType;
  tooltipClassname?: string;
};

export const Tooltip = ({ label, children = null, position }: TooltipProps) => {
  return (
    <p data-tooltip-id={GLOBAL_TOOLTIP} data-tooltip-content={label} data-tooltip-place={position}>
      {children}
    </p>
  );
};
