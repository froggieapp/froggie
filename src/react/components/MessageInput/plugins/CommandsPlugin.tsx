import {
  CLEAR_EDITOR_COMMAND,
  COMMAND_PRIORITY_HIGH,
  INSERT_LINE_BREAK_COMMAND,
  KEY_ENTER_COMMAND,
  LexicalCommand,
  SerializedEditorState,
  SerializedLexicalNode,
  SerializedParagraphNode,
  SerializedTextNode,
  createCommand,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect } from "preact/hooks";
import { SerializedEmoteNode } from "../CustomNodes/EmoteNode";
import { useChannelContext } from "@/react/util/ChannelContext";
import { mergeRegister } from "@lexical/utils";

export const SUGGESTION_COMMAND: LexicalCommand<KeyboardEvent> = createCommand("SUGGESTION_COMMAND");

export const CommandsPlugin = (): JSX.Element | null => {
  const [editor] = useLexicalComposerContext();
  const { onSendMessage } = useChannelContext();

  const onSubmit = useCallback(
    (data: SerializedEditorState<SerializedLexicalNode>) => {
      const nodes = data.root.children;
      const firstParagraph = nodes[0];
      if (!firstParagraph || firstParagraph.type !== "paragraph") {
        return;
      }
      let resultPayload = "";
      const firstParagraphChildren = (firstParagraph as SerializedParagraphNode).children;
      for (let i = 0; i < firstParagraphChildren.length; i += 1) {
        const node = firstParagraphChildren[i];
        switch (node.type) {
          case "emote": {
            resultPayload += (node as SerializedEmoteNode).value;
            break;
          }
          case "text": {
            resultPayload += (node as SerializedTextNode).text;
            break;
          }
        }
      }
      onSendMessage(resultPayload);
    },
    [onSendMessage],
  );

  useEffect(() => {
    return mergeRegister(
      editor.registerRootListener((rootElement, prevRootElement) => {
        const onKeyDown = (event: KeyboardEvent) => {
          if (event.code === "Slash") {
            editor.dispatchCommand(SUGGESTION_COMMAND, event);
          }
        };
        if (prevRootElement !== null) {
          prevRootElement.removeEventListener("keydown", onKeyDown);
        }
        if (rootElement !== null) {
          rootElement.addEventListener("keydown", onKeyDown);
        }
      }),
      editor.registerCommand(
        KEY_ENTER_COMMAND,
        (event) => {
          if (!event) return false;
          const { shiftKey, key } = event;

          if (key == "Enter" && shiftKey == false) {
            event.preventDefault();
            onSubmit(editor.getEditorState().toJSON());
            editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_HIGH,
      ),
      editor.registerCommand(
        INSERT_LINE_BREAK_COMMAND,
        () => {
          return true;
        },
        COMMAND_PRIORITY_HIGH,
      ),
    );
  }, [editor, onSubmit]);
  return null;
};
