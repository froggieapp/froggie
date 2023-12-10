import React from "react";
import "./index.css";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "../Tooltip";

interface MessageProps {
  senderName: string;
  content: string;
  error: string | undefined;
}

export const Message: React.FC<MessageProps> = ({ senderName, content, error }) => {
  return (
    <div className={!error ? "chat-message" : "message user-message-error"}>
      <p className="sender-name">
        {error ? (
          <Tooltip tag="span" className="user-message-error-tooltip" position="top" label={error}>
            <ExclamationCircleIcon width={20} />
          </Tooltip>
        ) : null}
        <span>{`${senderName}:`}&nbsp;</span>
      </p>
      <p className="message-content">{content}</p>
    </div>
  );
};
