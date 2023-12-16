import React from "react";
import { ChatEventRow } from "../ChatEventRow";
import "./index.css";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEventCountSubscribe } from "./useEventCountSubscribe";
import { useStore } from "@/react/store/Store";

interface ChatMessageListProps {
  channelId: string | undefined;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({ channelId }) => {
  const listRef = React.useRef<HTMLDivElement>(null);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = React.useState(true);
  const { eventCount, lastEvent } = useEventCountSubscribe(channelId);

  const virtualizer = useVirtualizer({
    count: eventCount,
    getScrollElement: () => listRef.current,
    estimateSize: () => 30,
  });

  React.useEffect(() => {
    setIsAutoScrollEnabled(true);
  }, [setIsAutoScrollEnabled, channelId]);

  const onScroll = React.useCallback(
    (e: React.UIEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const newScroll = e.currentTarget.scrollTop;
      const scrollHeight = e.currentTarget.scrollHeight;
      const clientHeight = e.currentTarget.clientHeight;
      const percentageScrolled = (el.scrollTop / (scrollHeight - clientHeight)) * 100;
      const isUp = newScroll >= 0 && percentageScrolled <= 99.93;
      if (isUp) {
        setIsAutoScrollEnabled(false);
      } else if (scrollHeight - newScroll >= clientHeight) {
        setIsAutoScrollEnabled(true);
      }
    },
    [setIsAutoScrollEnabled],
  );

  const items = virtualizer.getVirtualItems();
  const lastEventId = lastEvent?.id;
  React.useEffect(() => {
    requestAnimationFrame(() => {
      const currentEventCount = useStore.getState().getChannelEvents(channelId).length;
      if (lastEventId && !!currentEventCount && isAutoScrollEnabled) {
        virtualizer.scrollToIndex(currentEventCount - 1, {
          align: "start",
        });
      }
    });
  }, [channelId, lastEventId, isAutoScrollEnabled, virtualizer]);

  return (
    <div className="message-list-wrapper">
      <div ref={listRef} onScroll={onScroll} className="message-list">
        <div
          style={{
            height: virtualizer.getTotalSize(),
            width: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${items[0]?.start ?? 0}px)`,
            }}
          >
            {items.map((virtualRow) => (
              <ChatEventRow
                key={virtualRow.key}
                ref={virtualizer.measureElement}
                channelName={channelId}
                index={virtualRow.index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
