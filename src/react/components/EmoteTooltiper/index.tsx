import { h } from "preact";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "./index.css";
import { EMOTE_TOOLTIP } from "@/react/util/tooltips";

export const EmoteTooltiper = () => {
  return (
    <ReactTooltip
      className="global-tooltip"
      id={EMOTE_TOOLTIP}
      render={({ content, activeAnchor }) => {
        return (
          <div className="emote-tooltip-preview">
            <img src={activeAnchor?.getAttribute("data-emote-src") || ""} alt={content || ""} />
            <p>{content}</p>
          </div>
        );
      }}
    />
  );
};
