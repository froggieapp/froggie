import { FaceSmileIcon } from "@heroicons/react/20/solid";
import React from "react";
import "./index.css";
import { KICK_MSG_MAX_CHAR } from "@/react/util/constants";
import { useUser } from "@/react/hooks/useUser";
import { useSendMessage } from "@/react/hooks/useSendMessage";

interface MessageInputProps {
  chatroomId: string | undefined;
  channelId: string | undefined;
}

export const MessageInput: React.FC<MessageInputProps> = ({ chatroomId, channelId }) => {
  const keyMap = React.useRef<Record<string, boolean>>({});
  const [message, setMessage] = React.useState("");
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };
  const { data: user, isLoading } = useUser();

  const sendMessageMutation = useSendMessage();

  const handleKeyDownAndUp: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    keyMap.current[e.key] = e.type === "keydown";
  };

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

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
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

  return (
    <div className="message-input-wrapper">
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
          <button type="button">
            <FaceSmileIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
