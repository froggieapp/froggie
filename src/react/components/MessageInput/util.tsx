import { StoreEmoteCategory } from "@/react/store/createEmoteStore";
import { $createTextNode, $isTextNode, TextNode } from "lexical";
import { $createEmoteNode } from "./CustomNodes/EmoteNode";
import { sanitizeRegex } from "@/react/util/util";

export const findAndTransformEmotes = (node: TextNode, cats: (StoreEmoteCategory | undefined)[]) => {
  let text = node.getTextContent();
  for (let categoryIdx = 0; categoryIdx < cats.length; categoryIdx += 1) {
    const category = cats[categoryIdx];
    if (category) {
      const emotes = category.emotes;
      for (let emoteIdx = 0; emoteIdx < emotes.length; emoteIdx += 1) {
        const emote = emotes[emoteIdx];
        if (!emote.isLocked) {
          const regex = new RegExp(sanitizeRegex(emote.name));
          let matchArr, start;
          let targetNode;
          while ((matchArr = regex.exec(text)) !== null) {
            start = matchArr.index;
            let nextNode: TextNode;
            if (start === 0) {
              [targetNode, nextNode] = node.splitText(start + matchArr[0].length);
            } else {
              [, targetNode, nextNode] = node.splitText(start, start + matchArr[0].length);
            }
            if (!nextNode) {
              text = "";
            } else {
              text = nextNode.getTextContent();
            }
            const emoteNode = $createEmoteNode({
              src: emote.src,
              name: emote.name,
              alt: emote.name,
              isTextEmoji: false,
              value: emote.value,
            });
            emoteNode.markDirty();
            const textAfterEmote = $createTextNode(" ");
            targetNode.insertAfter(textAfterEmote);
            targetNode.replace(emoteNode);
            textAfterEmote.select();
            return;
          }
        }
      }
    }
  }

  return null;
};

export const textNodeToEmoteTransform = (node: TextNode, cats: (StoreEmoteCategory | undefined)[]) => {
  if (!node.isSimpleText()) {
    return;
  }

  findAndTransformEmotes(node, cats);
};

export const searchSuggestionMatches: (text: string, startIdx: number) => [boolean, string] = (text, startIdx) => {
  if (!text) {
    return [false, ""];
  }

  const currentChar = text[startIdx];

  if (!currentChar || currentChar === " " || startIdx === 0) {
    return [false, ""];
  }

  const trimmedText = text.trim();
  const trimmedDiff = text.length - trimmedText.length;
  const cappedStartIdx = startIdx - trimmedDiff;

  let matchStart = 0;

  for (matchStart = cappedStartIdx; matchStart > 0; matchStart -= 1) {
    const char = trimmedText[matchStart];
    if (char === " " && matchStart !== cappedStartIdx) break;
  }

  let matchEnd = 0;

  for (matchEnd = cappedStartIdx; matchEnd < trimmedText.length; matchEnd += 1) {
    const char = trimmedText[matchEnd];
    if (char === " ") break;
  }

  const trimmedRes = trimmedText.substring(matchStart, matchEnd).trim();

  return [!!trimmedRes?.length, trimmedRes];
};

export const $searchSuggestionMatches: (node: TextNode, selectionIdx: number) => [boolean, string] = (
  node,
  selectionIdx,
) => {
  if (!$isTextNode(node) || !node.isSimpleText()) {
    return [false, ""];
  }

  const text = node.getTextContent();
  return searchSuggestionMatches(text, selectionIdx);
};
