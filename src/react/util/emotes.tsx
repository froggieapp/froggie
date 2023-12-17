import React from "react";
import { KickEmote } from "../components/KickEmote";
import { VNode } from "preact";

const KICK_EMOTE_REGEXR = new RegExp(/\[emote:(\d{3,9}):([a-zA-Z0-9_]{2,22})\]/g);

export interface EmoteProps {
  id: string;
  name: string;
}

export const stringRegexToJsx = (msg: string, regex: RegExp, Element: React.FC<EmoteProps>) => {
  const parsedResult: VNode[] = [];
  const matches = msg.matchAll(regex);
  let lastIdx = 0;
  let i = 0;
  for (const match of matches) {
    if (match.index !== undefined && match.length >= 3) {
      const matchText = match[0];
      const emoteId = match[1];
      const emoteName = match[2];
      if (lastIdx !== match.index) {
        parsedResult.push(<span key={i}>{msg.substring(lastIdx, match.index)}</span>);
        i += 1;
      }

      parsedResult.push(<Element key={i} id={emoteId} name={emoteName} />);

      lastIdx = match.index + matchText.length;
      i += 1;
    }
  }

  if (!parsedResult.length) return msg;

  if (lastIdx < msg.length) {
    parsedResult.push(<span key={i}>{msg.substring(lastIdx)}</span>);
  }

  return parsedResult;
};

export const parseKickEmotes = (msg: string) => {
  return stringRegexToJsx(msg, KICK_EMOTE_REGEXR, KickEmote);
};
