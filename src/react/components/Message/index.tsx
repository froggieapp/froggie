import React from "react";
import "./index.css";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "../Tooltip";
import { parseKickEmotes } from "@/react/util/emotes";

interface MessageProps {
  senderName: string;
  content: string;
  error: string | undefined;
}

export const Message: React.FC<MessageProps> = ({ senderName, content, error }) => {
  const contentWithEmojis = parseKickEmotes(content);

  return (
    <div className={!error ? "chat-message" : "chat-message user-message-error"}>
      <p className="sender-name">
        {error ? (
          <Tooltip tag="span" className="user-message-error-tooltip" position="top" label={error}>
            <ExclamationCircleIcon width={20} />
          </Tooltip>
        ) : null}
        <span>{`${senderName}:`}&nbsp;</span>
      </p>
      <p className="message-content">{contentWithEmojis}</p>
    </div>
  );
};
