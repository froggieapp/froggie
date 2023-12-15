import React from "react";
import "./index.css";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "../Tooltip";
import { parseKickEmotes } from "@/react/util/emotes";
import { Kick } from "@KickerinoTypes/Kick";
import { KickBadge } from "../KickBadge";

interface MessageProps {
  senderName: string;
  content: string;
  error: string | undefined;
  nameColor: string | undefined;
  kickBadges: Kick.KickBadges;
}

const _Message: React.FC<MessageProps> = ({ senderName, content, error, nameColor, kickBadges }) => {
  const contentWithEmojis = parseKickEmotes(content);
  const nameStyle = React.useMemo(() => ({ color: nameColor || "#fff" }), [nameColor]);

  return (
    <div className={!error ? "chat-message" : "chat-message user-message-error"}>
      <div className="message-sender-identity-wrapper">
        <div className="message-sender-identity">
          {error ? (
            <Tooltip tag="span" className="user-message-error-tooltip" position="top" label={error}>
              <ExclamationCircleIcon width={20} />
            </Tooltip>
          ) : null}
          {kickBadges.length ? (
            <div className="message-badge-wrapper">
              {kickBadges.map((b) => (
                <KickBadge key={b.type} type={b.type} text={b.text} count={b.count} />
              ))}
            </div>
          ) : null}
          <div style={nameStyle} className="sender-name">
            {`${senderName}:`}&nbsp;
          </div>
        </div>
      </div>
      <span className="message-content">{contentWithEmojis}</span>
    </div>
  );
};

export const Message = React.memo(_Message);
