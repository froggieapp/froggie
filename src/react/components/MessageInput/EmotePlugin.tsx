import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  COMMAND_PRIORITY_EDITOR,
  LexicalCommand,
  TextNode,
  createCommand,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Ref, useCallback, useEffect, useImperativeHandle } from "preact/hooks";
import { $createEmoteNode, EmoteNode } from "./EmoteNode";
import { useStore } from "@/react/store/Store";
import { shallow } from "zustand/shallow";
import { textNodeToEmoteTransform } from "./util";

type InsertEmotePayload = {
  src: string | undefined;
  name: string;
  text: string | undefined;
  value: string;
};
export const INSERT_EMOTE_COMMAND: LexicalCommand<InsertEmotePayload> = createCommand();

export interface EmotePluginRef {
  addEmote: ((name: string, src: string | undefined, text: string | undefined, value: string) => void) | null;
}

interface EmotePluginProps {
  emotePluginRef: Ref<EmotePluginRef>;
}

export const EmotePlugin = ({ emotePluginRef }: EmotePluginProps): JSX.Element | null => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    let cleanupNodeTransform: null | (() => void) = null;
    const cleanSubscribe = useStore.subscribe(
      (state) => Object.values(state.emotes),
      (emotes) => {
        if (!editor.hasNodes([EmoteNode])) {
          throw new Error("EmotePlugin: EmoteNode not registered on editor (initialConfig.nodes)");
        }

        if (cleanupNodeTransform) cleanupNodeTransform();

        cleanupNodeTransform = editor.registerNodeTransform(TextNode, (node) => textNodeToEmoteTransform(node, emotes));
      },
      { equalityFn: shallow, fireImmediately: true },
    );

    const cleanInsertEmote = editor.registerCommand<InsertEmotePayload>(
      INSERT_EMOTE_COMMAND,
      (payload) => {
        let emoteNode: EmoteNode | null = null;
        if (payload.src) {
          emoteNode = $createEmoteNode({
            src: payload.src,
            name: payload.name,
            alt: payload.name,
            isTextEmoji: false,
            value: payload.value,
          });
        } else if (payload.text) {
          emoteNode = $createEmoteNode({
            src: payload.text,
            name: payload.text,
            alt: payload.name,
            isTextEmoji: true,
            value: payload.value,
          });
        }
        editor.update(() => {
          if (!emoteNode) return;
          const root = $getRoot();
          const currentSelection = $getSelection();
          if (currentSelection) {
            currentSelection.insertNodes([emoteNode]);
          } else {
            const firstChild = root.getFirstChild();
            if (firstChild === null) {
              const paragraph = $createParagraphNode();
              paragraph.append(emoteNode);
              root.append(paragraph);
            } else {
              firstChild.append(emoteNode);
            }

            root.selectEnd();
          }
        });

        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );

    return () => {
      cleanSubscribe();
      cleanInsertEmote();
      if (cleanupNodeTransform) cleanupNodeTransform();
    };
  }, [editor]);

  const addEmote = useCallback(
    (name: string, src: string | undefined, text: string | undefined, value: string) => {
      if (!editor.hasNodes([EmoteNode])) {
        throw new Error("EmotePlugin: EmoteNode not registered on editor (initialConfig.nodes)");
      }
      editor.dispatchCommand(INSERT_EMOTE_COMMAND, {
        name,
        src,
        text,
        value,
      });
    },
    [editor],
  );

  useImperativeHandle(
    emotePluginRef,
    () => ({
      addEmote,
    }),
    [addEmote],
  );

  return null;
};
