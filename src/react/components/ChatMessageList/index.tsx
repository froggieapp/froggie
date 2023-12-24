import { h } from "preact";
import { ChatEventRow } from "../ChatEventRow";
import "./index.css";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEventCountSubscribe } from "./useEventCountSubscribe";
import { useEffect, useRef } from "preact/hooks";

interface ChatMessageListProps {
  channelId: string | undefined;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({ channelId }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const { eventCount, lastEvent } = useEventCountSubscribe(channelId);
  const lastScrollTop = useRef(0);
  const isAutoScrolling = useRef(false);
  const scrollAnim = useRef<null | number>(null);

  const virtualizer = useVirtualizer({
    count: eventCount,
    getScrollElement: () => listRef.current,
    estimateSize: () => 80,
  });

  useEffect(() => {
    if (eventCount) {
      virtualizer.scrollToIndex(eventCount - 1);
    }
    if (scrollAnim.current) {
      cancelAnimationFrame(scrollAnim.current);
    }
    isAutoScrolling.current = true;
    lastScrollTop.current = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  const lastEventId = lastEvent?.id;

  const onWheel: React.JSX.WheelEventHandler<HTMLDivElement> = (e) => {
    const el = e.currentTarget;
    if (scrollAnim.current) cancelAnimationFrame(scrollAnim.current);
    isAutoScrolling.current = el.scrollTop > lastScrollTop.current;
    lastScrollTop.current = el.scrollTop;
  };

  const items = virtualizer.getVirtualItems();
  useEffect(() => {
    if (!channelId) return;

    scrollAnim.current = requestAnimationFrame(() => {
      const el = listRef.current;
      if (!el) return;
      const rangeEnd = virtualizer.range?.endIndex || 0;
      const isAtBottom = rangeEnd >= eventCount - 4;

      if (lastEventId && isAutoScrolling.current && isAtBottom) {
        virtualizer.scrollToIndex(eventCount - 1, {
          align: "start",
        });
      }
    });
    return () => {
      if (scrollAnim.current) cancelAnimationFrame(scrollAnim.current);
    };
  }, [eventCount, channelId, lastEventId, virtualizer]);

  return (
    <div className="message-list-wrapper">
      <div ref={listRef} onWheel={onWheel} className="message-list">
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
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
