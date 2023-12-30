import { h } from "preact";
import { Kick } from "@FroggieTypes/Kick";
import { badgeClassnames, badgeIcons } from "./badgeIcons";
import "./index.css";
import { useMemo } from "preact/hooks";
import { GLOBAL_TOOLTIP } from "@/react/util/tooltips";

export const KickBadge: React.FC<Kick.KickBadges[number]> = ({ type, text, count }) => {
  const Icon = useMemo(() => badgeIcons[type], [type]);
  const className = useMemo(() => badgeClassnames[type], [type]);
  return (
    <span
      data-tooltip-id={GLOBAL_TOOLTIP}
      data-tooltip-content={count && count > 1 ? `${count}x ${text}` : text}
      data-tooltip-place="top"
      className="fgr-KickBadge"
    >
      <Icon size={20} className={className} />
      {count && count > 1 ? <span className="fgr-KickBadge-count">{count}</span> : null}
    </span>
  );
};
