import { h } from "preact";
import { Kick } from "@KickerinoTypes/Kick";
import { badgeClassnames, badgeIcons } from "./badgeIcons";
import "./index.css";
import { Tooltip } from "../Tooltip";
import { useMemo } from "preact/hooks";

export const KickBadge: React.FC<Kick.KickBadges[number]> = ({ type, text, count }) => {
  const Icon = useMemo(() => badgeIcons[type], [type]);
  const className = useMemo(() => badgeClassnames[type], [type]);
  return (
    <Tooltip position="top" label={count && count > 1 ? `${count}x ${text}` : text}>
      <div className="kick-badge-wrapper">
        <Icon size={20} className={className} />
        {count && count > 1 ? <span className="kick-badge-count">{count}</span> : null}
      </div>
    </Tooltip>
  );
};
