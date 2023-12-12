import { StoreState, useStore } from "@/react/store/Store";
import React from "react";
import { ChatEventRow } from "../ChatEventRow";
import "./index.css";
import { useVirtualizer } from "@tanstack/react-virtual";
import debounce from "debounce";

interface ChatMessageListProps {
  channelId: string | undefined;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({ channelId }) => {
  const listRef = React.useRef<HTMLDivElement>(null);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = React.useState(true);
  const lastScroll = React.useRef(0);
  const [eventCount, setEventCount] = React.useState(() => useStore.getState().getChannelEvents(channelId).length);

  React.useEffect(() => {
    setIsAutoScrollEnabled(true);
    const updateState = (count: number) => {
      setEventCount(count);
    };
    const debounceCb = debounce((state: StoreState) => updateState(state.getChannelEvents(channelId).length), 200);
    const subscribe = useStore.subscribe(debounceCb);
    return () => {
      debounceCb.clear();
      subscribe();
    };
  }, [setEventCount, channelId]);

  const virtualizer = useVirtualizer({
    count: eventCount,
    getScrollElement: () => listRef.current,
    estimateSize: () => 30,
  });

  const onScroll = (e: React.UIEvent<HTMLElement>) => {
    const newScroll = e.currentTarget.scrollTop;
    const scrollHeight = e.currentTarget.scrollHeight;
    const clientHeight = e.currentTarget.clientHeight;
    const isUp = newScroll >= 0 && newScroll < lastScroll.current;
    if (isUp) {
      setIsAutoScrollEnabled(false);
    } else if (Math.ceil(scrollHeight - newScroll) === clientHeight) {
      setIsAutoScrollEnabled(true);
    }
    lastScroll.current = newScroll;
  };

  const items = virtualizer.getVirtualItems();
  React.useEffect(() => {
    if (!!eventCount && isAutoScrollEnabled) {
      virtualizer.scrollToIndex(eventCount - 1, {
        align: "start",
      });
    }
  }, [eventCount, isAutoScrollEnabled, virtualizer]);

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
