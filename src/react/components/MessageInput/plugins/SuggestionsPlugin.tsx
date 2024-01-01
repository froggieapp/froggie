import {
  $createTextNode,
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  $setSelection,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_LEFT_COMMAND,
  KEY_ARROW_RIGHT_COMMAND,
  KEY_ARROW_UP_COMMAND,
  KEY_ENTER_COMMAND,
  KEY_TAB_COMMAND,
  NodeKey,
  TextNode,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "preact/hooks";
import { useSharedSuggestionContext } from "../context/SharedSuggestionContext";
import { $createSuggestionNode, SuggestionNode, UUID } from "../CustomNodes/SuggestionNode";
import { mergeRegister } from "@lexical/utils";
import { useStore } from "@/react/store/Store";
import { distance } from "fastest-levenshtein";
import { StoreEmote } from "@/react/store/createEmoteStore";
import { $createEmoteNode } from "../CustomNodes/EmoteNode";
import { $searchSuggestionMatches } from "../util";

const MAX_SUGGESTIONS = 5;

export const SuggestionsPlugin = (): JSX.Element | null => {
  const [editor] = useLexicalComposerContext();
  const [, setSuggestions, , setIdx] = useSharedSuggestionContext();

  useEffect(() => {
    let suggestionNodeKey: null | NodeKey = null;
    let lastSuggestions: null | StoreEmote[] = null;
    let lastMatch: null | string = null;
    let lastIdx: number = 0;

    const $clearSuggestion = () => {
      const suggestionNode = suggestionNodeKey !== null ? $getNodeByKey(suggestionNodeKey) : null;
      if (suggestionNode !== null && suggestionNode.isAttached()) {
        suggestionNode.remove();
        suggestionNodeKey = null;
      }
      lastMatch = null;
      lastSuggestions = null;
      setSuggestions(null);
      lastIdx = 0;
      setIdx(0);
    };

    const handleAutocompleteNodeTransform = (node: SuggestionNode) => {
      const key = node.getKey();
      if (node.__uuid === UUID && key !== suggestionNodeKey) {
        $clearSuggestion();
      }
    };

    const handleUpdateText = (textNode: TextNode) => {
      if (!textNode.isSimpleText() || !textNode.isSelected()) return;
      editor.update(() => {
        const selection = $getSelection();

        if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
          $clearSuggestion();
          return;
        }
        const [hasMatch, match] = $searchSuggestionMatches(textNode, selection.anchor.offset - 1);

        if (!hasMatch || !match.length) {
          $clearSuggestion();
          return;
        }

        if (match === lastMatch) {
          return;
        }

        $clearSuggestion();
        lastMatch = match;
        const categories = useStore.getState().emotes;

        const computedSuggestions: {
          data: StoreEmote;
          value: number;
        }[] = [];

        const lowerCaseMatch = match.toLowerCase();
        for (let categoryIdx = 0; categoryIdx < categories.length; categoryIdx += 1) {
          const category = categories[categoryIdx];
          const emotes = category.emotes;
          for (let emoteIdx = 0; emoteIdx < emotes.length; emoteIdx += 1) {
            const emote = emotes[emoteIdx];
            const lowerCaseEmoteName = emote.name.toLowerCase();
            if (!emote.isLocked && lowerCaseEmoteName.includes(lowerCaseMatch)) {
              const computedValue = distance(lowerCaseMatch, lowerCaseEmoteName);
              computedSuggestions.push({
                value: computedValue,
                data: emote,
              });
            }
          }
        }

        const sortedSuggestions = computedSuggestions
          .slice()
          .sort((a, b) => {
            if (a.value === b.value) return 0;
            return a.value > b.value ? 1 : -1;
          })
          .slice(0, MAX_SUGGESTIONS)
          .map((s) => s.data);

        if (sortedSuggestions.length) {
          editor.update(
            () => {
              const selectionCopy = selection.clone();
              const node = $createSuggestionNode(UUID);
              suggestionNodeKey = node.getKey();
              selection.insertNodes([node]);
              $setSelection(selectionCopy);
              lastSuggestions = sortedSuggestions;
              setSuggestions(sortedSuggestions);
            },
            { tag: "history-merge" },
          );
        }
      });
    };
    const $handleAcceptSuggestion = () => {
      if (
        !lastMatch ||
        lastSuggestions === null ||
        !lastSuggestions.length ||
        suggestionNodeKey === null ||
        lastIdx > lastSuggestions.length
      ) {
        return false;
      }
      const suggestionNode = $getNodeByKey(suggestionNodeKey);
      const emote = lastSuggestions[lastIdx];
      if (suggestionNode === null || !emote) {
        return false;
      }

      const emoteNote = $createEmoteNode({
        src: emote.src,
        name: emote.name,
        alt: emote.name,
        isTextEmoji: false,
        value: emote.value,
      });

      const prevNode = suggestionNode.getPreviousSibling();
      if (prevNode && $isTextNode(prevNode) && prevNode.isSimpleText()) {
        const currentText = prevNode.getTextContent().split(" ");
        if (!currentText.length) {
          prevNode.remove();
        } else {
          const textWithoutMatch = currentText.slice(0, currentText.length - 1).join(" ");
          prevNode.setTextContent(textWithoutMatch);
        }
      }
      suggestionNode.replace(emoteNote);
      const spaceAfter = $createTextNode(" ");
      emoteNote.insertBefore($createTextNode(" "));
      emoteNote.insertAfter(spaceAfter);
      spaceAfter.selectNext();
      $clearSuggestion();
      return true;
    };
    const $handleNextSelection = (incr: number) => {
      if (lastSuggestions === null || !lastSuggestions.length || suggestionNodeKey === null) {
        return false;
      }
      const suggestionNode = $getNodeByKey(suggestionNodeKey);
      if (suggestionNode === null) {
        return false;
      }
      const nextIdx = lastIdx + incr;
      if (nextIdx >= 0) {
        lastIdx = nextIdx % lastSuggestions.length;
      } else {
        lastIdx = lastSuggestions.length - 1;
      }
      setIdx(lastIdx);
      return true;
    };
    const $handleAcceptSuggestionKeypressCommand = (e: Event) => {
      if ($handleAcceptSuggestion()) {
        e.preventDefault();
        return true;
      }
      return false;
    };

    const $handleNavigate = () => {
      if (lastSuggestions !== null || lastMatch !== null) {
        $clearSuggestion();
      }

      return false;
    };

    const $handleNextSelectionKeypressCommand = (incr: number) => (e: Event) => {
      if ($handleNextSelection(incr)) {
        e.preventDefault();
        return true;
      }
      return false;
    };

    const $nextSuggestion = $handleNextSelectionKeypressCommand(1);
    const $prevSuggestion = $handleNextSelectionKeypressCommand(-1);

    const unmountSuggestion = () => {
      editor.update(() => {
        $clearSuggestion();
      });
    };

    return mergeRegister(
      editor.registerNodeTransform(SuggestionNode, handleAutocompleteNodeTransform),
      editor.registerNodeTransform(TextNode, handleUpdateText),
      editor.registerCommand(KEY_ENTER_COMMAND, $handleAcceptSuggestionKeypressCommand, COMMAND_PRIORITY_CRITICAL),
      editor.registerCommand(KEY_TAB_COMMAND, $nextSuggestion, COMMAND_PRIORITY_HIGH),
      editor.registerCommand(KEY_ARROW_UP_COMMAND, $prevSuggestion, COMMAND_PRIORITY_HIGH),
      editor.registerCommand(KEY_ARROW_DOWN_COMMAND, $nextSuggestion, COMMAND_PRIORITY_HIGH),
      editor.registerCommand(KEY_ARROW_LEFT_COMMAND, $handleNavigate, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_ARROW_RIGHT_COMMAND, $handleNavigate, COMMAND_PRIORITY_LOW),
      unmountSuggestion,
    );
  }, [editor, setSuggestions, setIdx]);

  return null;
};
