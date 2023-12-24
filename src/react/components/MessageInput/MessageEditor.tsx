import { KICK_MSG_MAX_CHAR } from "@/react/util/constants";
import { RefObject, h } from "preact";
import { InitialConfigType, LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { EmoteNode } from "./EmoteNode";
import { EmotePlugin, EmotePluginRef } from "./EmotePlugin";
import { EditorThemeClasses } from "lexical";
import { MaxLengthPlugin } from "./MaxLengthPlugin";
import { CommandsPlugin } from "./CommandsPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";

interface MessageEditorProps {
  emotePluginRef: RefObject<EmotePluginRef>;
}

const theme: EditorThemeClasses = {
  root: "editor-root",
  paragraph: "input-editor-paragraph",
};

function onError(error: Error) {
  console.error(error);
}

export const MessageEditor = ({ emotePluginRef }: MessageEditorProps) => {
  const initialConfig: InitialConfigType = {
    namespace: "MessageEditor",
    theme,
    onError,
    nodes: [EmoteNode],
  };

  return (
    <div className="input-editor">
      <LexicalComposer initialConfig={initialConfig}>
        <PlainTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={<div className="editor-placeholder">Type your message 🐸</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <CommandsPlugin />
        <ClearEditorPlugin />
        <MaxLengthPlugin maxLength={KICK_MSG_MAX_CHAR} />
        <EmotePlugin emotePluginRef={emotePluginRef} />
        <HistoryPlugin />
      </LexicalComposer>
    </div>
  );
};
