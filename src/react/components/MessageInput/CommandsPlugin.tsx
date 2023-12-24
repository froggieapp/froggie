import {
  CLEAR_EDITOR_COMMAND,
  COMMAND_PRIORITY_HIGH,
  INSERT_LINE_BREAK_COMMAND,
  KEY_ENTER_COMMAND,
  SerializedEditorState,
  SerializedLexicalNode,
  SerializedParagraphNode,
  SerializedTextNode,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect } from "preact/hooks";
import { SerializedEmoteNode } from "./EmoteNode";
import { useChannelContext } from "@/react/util/ChannelContext";

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
    const enterCleanup = editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event) => {
        if (!event) return false;
        const { shiftKey, key } = event;

        if (key == "Enter" && shiftKey == false) {
          event.preventDefault();
          onSubmit(editor.getEditorState().toJSON());
          editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
        }

        return true;
      },
      COMMAND_PRIORITY_HIGH,
    );
    const addParagraphCleanup = editor.registerCommand(
      INSERT_LINE_BREAK_COMMAND,
      () => {
        return true;
      },
      COMMAND_PRIORITY_HIGH,
    );
    return () => {
      enterCleanup();
      addParagraphCleanup();
    };
  }, [editor, onSubmit]);
  return null;
};
