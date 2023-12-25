import { h } from "preact";
import "./index.css";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "../Tooltip";
import { parseKickEmotes, parseStoreEmotes } from "@/react/util/emotes";
import { Kick } from "@FroggieTypes/Kick";
import { KickBadge } from "../KickBadge";
import { useMemo } from "preact/hooks";
import { memo } from "preact/compat";
import { useStore } from "@/react/store/Store";

interface MessageProps {
  senderName: string;
  content: string;
  error: string | undefined;
  nameColor: string | undefined;
  kickBadges: Kick.KickBadges;
}

const _Message: React.FC<MessageProps> = ({ senderName, content, error, nameColor, kickBadges }) => {
  const emotes = useStore((state) => state.emotes.flatMap((e) => e.emotes));
  const contentWithEmojis = parseStoreEmotes(parseKickEmotes(content), emotes);
  const nameStyle = useMemo(() => ({ color: nameColor || "#fff" }), [nameColor]);

  return (
    <div className={!error ? "chat-message" : "chat-message user-message-error"}>
      <div className="message-sender-identity-wrapper">
        <div className="message-sender-identity">
          {error ? (
            <Tooltip position="top" label={error}>
              <p className={"user-message-error-tooltip"}>
                <ExclamationCircleIcon width={20} />
              </p>
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

export const Message = memo(_Message);
