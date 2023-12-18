import { FaceSmileIcon } from "@heroicons/react/20/solid";
import React, { ChangeEvent } from "react";
import "./index.css";
import { KICK_MSG_MAX_CHAR } from "@/react/util/constants";
import { useUser } from "@/react/hooks/useUser";
import { useSendMessage } from "@/react/hooks/useSendMessage";
import { EmojiData, EmotePicker } from "../EmotePicker";

interface MessageInputProps {
  chatroomId: string | undefined;
  channelId: string | undefined;
}

export const MessageInput: React.FC<MessageInputProps> = ({ chatroomId, channelId }) => {
  const keyMap = React.useRef<Record<string, boolean>>({});
  const [message, setMessage] = React.useState("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const onToggleEmojiPicker = () => setShowEmojiPicker((s) => !s);
  const { data: user, isLoading } = useUser();
  const onClickOutsideEmojiPicker = React.useCallback(() => {
    if (showEmojiPicker) setShowEmojiPicker(false);
  }, [showEmojiPicker]);
  const sendMessageMutation = useSendMessage();

  const handleKeyDownAndUp: React.JSX.KeyboardEventHandler<HTMLInputElement> = (e) => {
    keyMap.current[e.key] = e.type === "keydown";
  };

  const onAddEmote = React.useCallback(
    (data: EmojiData) => {
      setMessage((m) => `${m}${data.native}`);
    },
    [setMessage],
  );

  const parseInput = () => {
    if (keyMap.current["Enter"]) {
      if (!user?.id || !chatroomId || !channelId || !message.trim()) return;
      sendMessageMutation.mutate({
        sender: user.username,
        chatroomId,
        channelId,
        content: message,
        // todo: query user identity
        kickBadges: [],
        senderNameColor: "#fff",
      });
      if (!keyMap.current["Shift"]) {
        setMessage("");
      }
    }
  };

  const handleKeyDown: React.JSX.KeyboardEventHandler<HTMLInputElement> = (e) => {
    handleKeyDownAndUp(e);
    parseInput();
  };

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
      <div className="emote-picker-wrapper">
        <EmotePicker onClickOutside={onClickOutsideEmojiPicker} onAddEmote={onAddEmote} show={showEmojiPicker} />
      </div>
      <div className="message-input">
        <input
          value={message}
          onChange={onChange}
          placeholder="Type your bullshit here..."
          className="message-input"
          type="text"
          maxLength={KICK_MSG_MAX_CHAR}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyDownAndUp}
        />
        <div className="message-input-options">
          <button onClick={onToggleEmojiPicker} type="button">
            <FaceSmileIcon className="input-smile-icon" data-open={showEmojiPicker || undefined} />
          </button>
        </div>
      </div>
    </div>
  );
};
