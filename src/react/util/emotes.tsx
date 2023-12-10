import React from "react";
import { KickEmote } from "../components/KickEmote";

const KICK_EMOTE_REGEXR = new RegExp(/\[emote:(\d{3,9}):([a-zA-Z0-9]{2,20})\]/g);

export interface EmoteProps {
  id: string;
  name: string;
}

export const stringRegexToJsx = (msg: string, regex: RegExp, Element: React.FC<EmoteProps>) => {
  const parsedResult: React.ReactElement[] = [];
  const matches = msg.matchAll(regex);
  let lastIdx = 0;
  let i = 0;
  console.log("========= stringRegexToJsx ========");
  console.log("TEXXT= ", msg);
  console.log("matches= ", matches);
  for (const match of matches) {
    console.log("match", match);

    if (match.length >= 3) {
      console.log(match);
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

  console.log("parsedResult", parsedResult);
  console.log("================");
  if (!parsedResult.length) return msg;

  return parsedResult;
};

export const parseKickEmotes = (msg: string) => {
  return stringRegexToJsx(msg, KICK_EMOTE_REGEXR, KickEmote);
};
