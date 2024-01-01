import { StoreEmote } from "@/react/store/createEmoteStore";
import "./index.css";
import { useLayoutEffect, useRef, useState } from "preact/hooks";
import { CSSProperties } from "preact/compat";
import { h } from "preact";

interface MessageInputSuggestionProps {
  suggestions: StoreEmote[];
  activeSuggestion: number;
}

export const MessageInputSuggestion = ({ suggestions, activeSuggestion }: MessageInputSuggestionProps) => {
  const [posStyle, setPosStyle] = useState<undefined | CSSProperties>(undefined);
  const elRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const rect = elRef.current?.parentElement?.getBoundingClientRect();
    const currentRect = elRef.current?.getBoundingClientRect();
    const target = elRef.current?.parentElement;

    if (rect && target && currentRect) {
      setPosStyle({
        top: rect.top - currentRect.height - 18 + window.scrollY,
        left: rect.left + target.offsetWidth + window.scrollX,
      });
    }
  }, [elRef, setPosStyle]);
  return (
    <div ref={elRef} style={posStyle} className="fgr-MessageInputSuggestion">
      {suggestions.map((s, i) => (
        <div
          className={`fgr-MessageInputSuggestion-emote u-shadowLg ${
            activeSuggestion === i ? "fgr-MessageInputSuggestion-emote--active" : ""
          }`}
          key={s.id}
        >
          <img className="fgr-MessageInputSuggestion-emoteImg" src={s.src} width={25} />
          <span data-testid="suggestion" className="fgr-MessageInputSuggestion-emoteName">
            {s.name}
          </span>
        </div>
      ))}
    </div>
  );
};
