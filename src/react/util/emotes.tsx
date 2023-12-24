import { KickEmote } from "../components/KickEmote";
import { Fragment, VNode, h } from "preact";
import { FC } from "preact/compat";
import emoji from "react-easy-emoji";
import * as EmojiIcons from "twemoji-react-assets/assets/react";

const KICK_EMOTE_REGEXR = new RegExp(/\[emote:(\d{3,9}):([a-zA-Z0-9_]{2,22})\]/g);
export const GET_KICK_EMOTE_SRC = (id: string) => `https://files.kick.com/emotes/${id}/fullsize`;
export const GET_KICK_PROFILE_PICTURE_SRC = (id: string) =>
  `https://files.kick.com/images/user/${id}/profile_image/conversion/9cd18533-eddb-4b0d-9d43-cc2cdb1b96ea-thumb.webp`;
export interface EmoteProps {
  id: string;
  name: string;
}

export const stringRegexToJsx = (msg: string, regex: RegExp, Element: FC<EmoteProps>) => {
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

export const defaultEmoteCategories = [
  "activity",
  "flags",
  "foods",
  "frequent",
  "nature",
  "objects",
  "people",
  "places",
  "symbols",
];

const formatSvgFilename = (code: string) => {
  return `Svg_${code.replace(/-/g, "_")}`;
};

export const svgEmoji = (input: string, className?: string) => {
  return emoji(input, (code, str, key) => {
    const formattedCode = formatSvgFilename(code);
    const Component = EmojiIcons[formattedCode as keyof typeof EmojiIcons] || null;
    if (Component) return <Component className={className} draggable={false} alt={str} key={key} />;
    return <Fragment key={key} />;
  });
};
