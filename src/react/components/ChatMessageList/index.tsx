import { h } from "preact";
import { ChatEventRow } from "../ChatEventRow";
import "./index.css";
import { useEffect, useRef, useState } from "preact/hooks";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { useStore } from "@/react/store/Store";
import debounce, { DebouncedFunction } from "debounce";

interface ChatMessageListProps {
  channelId: string | undefined;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({ channelId }) => {
  const [eventCount, setEventCount] = useState(() =>
    channelId ? useStore.getState().eventChannels[channelId]?.length || 0 : 0,
  );
  const virtuoso = useRef<VirtuosoHandle>(null);
  const showBottomButtonTimeoutRef = useRef<null | NodeJS.Timeout>(null);
  const [atBottom, setAtBottom] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let subscribe: () => void;
    let debounceCb: DebouncedFunction<(count: number) => void>;
    if (atBottom) {
      const updateState = (count: number) => {
        setEventCount(count);
      };
      debounceCb = debounce((count: number) => {
        updateState(count);
      }, 50);
      subscribe = useStore.subscribe((state) => {
        const events = channelId ? state.eventChannels[channelId] || [] : [];
        return events.length;
      }, debounceCb);
    }

    return () => {
      debounceCb?.clear();
      subscribe?.();
    };
  }, [setEventCount, atBottom, channelId]);

  useEffect(() => {
    return () => {
      if (showBottomButtonTimeoutRef.current) clearTimeout(showBottomButtonTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (showBottomButtonTimeoutRef.current) clearTimeout(showBottomButtonTimeoutRef.current);
    if (!atBottom) {
      showBottomButtonTimeoutRef.current = setTimeout(() => setShowButton(true), 500);
    } else {
      setShowButton(false);
    }
  }, [atBottom, setShowButton]);

  const handleAtBottom = (bottom: boolean) => {
    setEventCount(channelId ? useStore.getState().eventChannels[channelId]?.length || 0 : 0);
    setAtBottom(bottom);
  };

  const scrollToBottom = () => {
    virtuoso.current?.scrollToIndex(eventCount);
  };

  return (
    <div className="fgr-ChatMessageList">
      <Virtuoso
        ref={virtuoso}
        followOutput
        atBottomThreshold={30}
        atBottomStateChange={handleAtBottom}
        initialTopMostItemIndex={eventCount - 1}
        totalCount={eventCount}
        itemContent={(index) => <ChatEventRow channelName={channelId} index={index} />}
      />
      {showButton ? (
        <button type="button" onClick={scrollToBottom} className="fgr-ChatMessageList-scrollToBottom">
          Chat is paused. Click to see new messages.
        </button>
      ) : null}
    </div>
  );
};
