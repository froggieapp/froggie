import "./index.css";
import { h } from "preact";
import { EMOTE_TOOLTIP } from "@/react/util/tooltips";

export interface DefaultEmoteProps {
  src: string;
  name: string;
  className?: string;
}

export const DefaultEmote: React.FC<DefaultEmoteProps> = ({ src, name }) => {
  return (
    <img
      data-tooltip-id={EMOTE_TOOLTIP}
      data-emote-src={src}
      data-tooltip-content={name}
      data-tooltip-place={"top"}
      className="fgr-DefaultEmote fgr-Message-content"
      src={src}
      alt={name}
    />
  );
};
