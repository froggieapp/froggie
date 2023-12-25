import { Fragment, VNode, h } from "preact";
import emoji from "react-easy-emoji";
import * as EmojiIcons from "twemoji-react-assets/assets/react";
import { StoreEmote } from "../store/createEmoteStore";
import { DefaultEmote } from "../components/DefaultEmote";

const KICK_EMOTE_REGEXR = /\[emote:(\d{3,9}):([a-zA-Z0-9_]{2,25})\]/g;
export const GET_KICK_EMOTE_SRC = (id: string) => `https://files.kick.com/emotes/${id}/fullsize`;
export const GET_KICK_PROFILE_PICTURE_SRC = (id: string) =>
  `https://files.kick.com/images/user/${id}/profile_image/conversion/9cd18533-eddb-4b0d-9d43-cc2cdb1b96ea-thumb.webp`;
export interface EmoteProps {
  id: string;
  name: string;
}

export const parseKickEmotesToStore = (msg: string) => {
  return msg.replace(KICK_EMOTE_REGEXR, "$2");
};

export const parseStoreEmotes = (msg: string, emotes: StoreEmote[]) => {
  let result: (string | VNode)[] = [msg];
  let key = 0;
  for (let emoteIdx = 0; emoteIdx < emotes.length; emoteIdx += 1) {
    const emote = emotes[emoteIdx];
    const parsedResult: (string | VNode)[] = [];
    for (let nodeIdx = 0; nodeIdx < result.length; nodeIdx += 1) {
      const node = result[nodeIdx];
      if (typeof node === "string") {
        const emoteSlices = node.split(emote.value);
        if (emoteSlices.length) {
          for (let emoteSliceIdx = 0; emoteSliceIdx < emoteSlices.length; emoteSliceIdx += 1) {
            if (emoteSlices[emoteSliceIdx]) parsedResult.push(emoteSlices[emoteSliceIdx]);
            if (emoteSliceIdx < emoteSlices.length - 1) {
              parsedResult.push(<DefaultEmote key={key} src={emote.src} name={emote.name} />);
            }

            key += 1;
          }
        }
      } else {
        parsedResult.push(node);
      }
    }
    result = parsedResult;
  }
  return result;
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
