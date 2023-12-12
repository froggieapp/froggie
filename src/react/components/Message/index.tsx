import React from "react";
import "./index.css";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "../Tooltip";
import { parseKickEmotes } from "@/react/util/emotes";

interface MessageProps {
  senderName: string;
  content: string;
  error: string | undefined;
  nameColor: string | undefined;
}

const _Message: React.FC<MessageProps> = ({ senderName, content, error, nameColor }) => {
  const contentWithEmojis = parseKickEmotes(content);
  const nameStyle = React.useMemo(() => ({ color: nameColor || "#fff" }), [nameColor]);

  return (
    <div className={!error ? "chat-message" : "chat-message user-message-error"}>
      <p className="sender-name-wrapper">
        {error ? (
          <Tooltip tag="span" className="user-message-error-tooltip" position="top" label={error}>
            <ExclamationCircleIcon width={20} />
          </Tooltip>
        ) : null}
        <span style={nameStyle} className="sender-name">
          {`${senderName}:`}&nbsp;
        </span>
      </p>
      <p className="message-content">{contentWithEmojis}</p>
    </div>
  );
};

export const Message = React.memo(_Message);
