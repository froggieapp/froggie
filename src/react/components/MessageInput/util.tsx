import { StoreEmoteCategory } from "@/react/store/createEmoteStore";
import { $createTextNode, TextNode } from "lexical";
import { $createEmoteNode } from "./EmoteNode";
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
