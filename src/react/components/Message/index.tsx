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
import { useShallow } from "zustand/react/shallow";

interface MessageProps {
  senderName: string;
  content: string;
  error: string | undefined;
  nameColor: string | undefined;
  kickBadges: Kick.KickBadges;
}

const _Message: React.FC<MessageProps> = ({ senderName, content, error, nameColor, kickBadges }) => {
  const { emotes, openUserCard } = useStore(
    useShallow((state) => ({
      emotes: state.emotes.flatMap((e) => e.emotes),
      openUserCard: state.openUserCardModal,
    })),
  );
  const contentWithEmojis = parseStoreEmotes(parseKickEmotes(content), emotes);
  const nameStyle = useMemo(() => ({ color: nameColor || "#fff" }), [nameColor]);
  const onClickUsername = (e: MouseEvent) => {
    const target = e.currentTarget;
    if (target instanceof HTMLDivElement) {
      const rect = target.getBoundingClientRect();
      openUserCard(senderName, rect.left + target.offsetWidth + window.scrollX, rect.top + window.scrollY);
    }
  };
  return (
    <div className={!error ? "chat-message" : "chat-message user-message-error"}>
      <div onClick={onClickUsername} className="message-sender-identity-wrapper">
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
