import React from "react";
import "./index.css";
import { useUser } from "@/react/hooks/useUser";
import { h } from "preact";
import { MessageEditor } from "./MessageEditor";
import { EditorEmojiPicker } from "./EditorEmojiPicker";
import { EmotePluginRef } from "./plugins/EmotePlugin";
import { LoginBanner } from "../LoginBanner";

export const MessageInput = () => {
  const emotePluginRef = React.useRef<EmotePluginRef>(null);
  const { data: user, isLoading } = useUser();

  if (!isLoading && !user?.username) {
    return <LoginBanner>Please log in to use chat. Click on the green gear on bottom left to log in.</LoginBanner>;
  }

  if (isLoading) {
    return <LoginBanner>Loading...</LoginBanner>;
  }

  return (
    <div className="fgr-MessageInput">
      <MessageEditor emotePluginRef={emotePluginRef} />
      <EditorEmojiPicker emotePluginRef={emotePluginRef} />
    </div>
  );
};
