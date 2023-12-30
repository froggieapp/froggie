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
import { wrapStringsIntoSpan } from "./util";

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
  const contentWithEmojis = wrapStringsIntoSpan(
    parseStoreEmotes(parseKickEmotes(content), emotes),
    "fgr-Message-content u-messageBodyFont",
  );
  const nameStyle = useMemo(() => ({ color: nameColor || "#fff" }), [nameColor]);
  const onClickUsername = (e: MouseEvent) => {
    const target = e.currentTarget;
    if (target instanceof HTMLButtonElement) {
      const rect = target.getBoundingClientRect();
      openUserCard(senderName, rect.left + target.offsetWidth + window.scrollX, rect.top + window.scrollY);
    }
  };
  return (
    <div className={!error ? "fgr-Message u-messageBodyFont" : "fgr-Message u-messageBodyFont fgr-Message--error"}>
      {error ? (
        <Tooltip position="top" label={error}>
          <p className={"fgr-Message-tooltip"}>
            <ExclamationCircleIcon className="fgr-Message-tooltipIcon" width={20} />
          </p>
        </Tooltip>
      ) : null}
      {kickBadges.length ? (
        <span className="fgr-Message-badge">
          {kickBadges.map((b) => (
            <KickBadge key={b.type} type={b.type} text={b.text} count={b.count} />
          ))}
        </span>
      ) : null}
      <button
        role="button"
        style={nameStyle}
        onClick={onClickUsername}
        className="fgr-Message-senderName u-messageBodyFont fgr-Message-content"
      >
        {`${senderName}:`}&nbsp;
      </button>
      {contentWithEmojis}
    </div>
  );
};

export const Message = memo(_Message);
