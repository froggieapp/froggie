import { h } from "preact";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "./index.css";
import { EMOTE_TOOLTIP } from "@/react/util/tooltips";

export const EmoteTooltiper = () => {
  return (
    <ReactTooltip
      className="global-tooltip u-shadowSm"
      id={EMOTE_TOOLTIP}
      render={({ content, activeAnchor }) => {
        return (
          <div className="fgr-EmoteTooltiper">
            <img
              className="fgr-EmoteTooltiper-emoteImg"
              src={activeAnchor?.getAttribute("data-emote-src") || ""}
              alt={content || ""}
            />
            <p className="fgr-EmoteTooltiper-emoteName">{content}</p>
          </div>
        );
      }}
    />
  );
};
