import React from "react";
import { Kick } from "@KickerinoTypes/Kick";
import { badgeClassnames, badgeIcons } from "./badgeIcons";
import "./index.css";
import { Tooltip } from "../Tooltip";

export const KickBadge: React.FC<Kick.KickBadges[number]> = ({ type, text, count }) => {
  const Icon = React.useMemo(() => badgeIcons[type], [type]);
  const className = React.useMemo(() => badgeClassnames[type], [type]);
  return (
    <Tooltip
      tag="div"
      position="top"
      className="kick-badge-wrapper"
      label={count && count > 1 ? `${count}x ${text}` : text}
    >
      <Icon size={20} className={className} />
      {count && count > 1 ? <span className="kick-badge-count">{count}</span> : null}
    </Tooltip>
  );
};
