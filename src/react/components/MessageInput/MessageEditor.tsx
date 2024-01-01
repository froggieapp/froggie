import { KICK_MSG_MAX_CHAR } from "@/react/util/constants";
import { RefObject, h } from "preact";
import { InitialConfigType, LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { EmoteNode } from "./CustomNodes/EmoteNode";
import { EmotePlugin, EmotePluginRef } from "./plugins/EmotePlugin";
import { EditorThemeClasses } from "lexical";
import { MaxLengthPlugin } from "./plugins/MaxLengthPlugin";
import { CommandsPlugin } from "./plugins/CommandsPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { SuggestionsPlugin } from "./plugins/SuggestionsPlugin";
import { SuggestionNode } from "./CustomNodes/SuggestionNode";
import { SharedSuggestionContext } from "./context/SharedSuggestionContext";
import { DecoratorArrowNavigation } from "./plugins/DecoratorArrowNavigation";

interface MessageEditorProps {
  emotePluginRef: RefObject<EmotePluginRef>;
}

const theme: EditorThemeClasses = {
  root: "fgr-MessageInput-editorRoot",
  paragraph: "fgr-MessageInput-editorParagraph",
};

function onError(error: Error) {
  console.error(error);
}

export const MessageEditor = ({ emotePluginRef }: MessageEditorProps) => {
  const initialConfig: InitialConfigType = {
    namespace: "MessageEditor",
    theme,
    onError,
    nodes: [SuggestionNode, EmoteNode],
  };

  return (
    <div className="fgr-MessageInput-editor">
      <LexicalComposer initialConfig={initialConfig}>
        <SharedSuggestionContext>
          <PlainTextPlugin
            contentEditable={<ContentEditable />}
            placeholder={<div className="fgr-MessageInput-placeholder">Type your message 🐸</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <DecoratorArrowNavigation />
          <CommandsPlugin />
          <SuggestionsPlugin />
          <ClearEditorPlugin />
          <MaxLengthPlugin maxLength={KICK_MSG_MAX_CHAR} />
          <EmotePlugin emotePluginRef={emotePluginRef} />
          <HistoryPlugin />
        </SharedSuggestionContext>
      </LexicalComposer>
    </div>
  );
};
