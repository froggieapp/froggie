import React from "react";
import "./index.css";
import { useUser } from "@/react/hooks/useUser";
import { h } from "preact";
import { MessageEditor } from "./MessageEditor";
import { EditorEmojiPicker } from "./EditorEmojiPicker";
import { EmotePluginRef } from "./EmotePlugin";

export const MessageInput = () => {
  const emotePluginRef = React.useRef<EmotePluginRef>(null);
  const { data: user, isLoading } = useUser();

  if (!isLoading && !user?.username) {
    return (
      <div className="please-log-in-banner">
        Please log in to use chat. Click on the green gear on bottom left to log in.
      </div>
    );
  }

  if (isLoading) {
    return <div className="please-log-in-banner">Loading...</div>;
  }

  return (
    <div className="message-input-wrapper">
      <MessageEditor emotePluginRef={emotePluginRef} />
      <EditorEmojiPicker emotePluginRef={emotePluginRef} />
    </div>
  );
};
