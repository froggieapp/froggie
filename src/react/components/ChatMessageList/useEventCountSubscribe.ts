import { useStore } from "@/react/store/Store";
import { StoreEvent } from "@/react/store/createEventStore";
import debounce from "debounce";
import { useEffect, useState } from "preact/hooks";
import { shallow } from "zustand/shallow";

export const useEventCountSubscribe = (channelId: string | undefined) => {
  const [eventCount, setEventCount] = useState(() => useStore.getState().getChannelEvents(channelId).length);
  const [lastEvent, setLastEvent] = useState<null | StoreEvent>(null);

  useEffect(() => {
    const updateState = (count: number) => {
      setEventCount(count);
    };
    const currentEventCount = useStore.getState().getChannelEvents(channelId).length;
    setEventCount(currentEventCount);
    const debounceCb = debounce(({ count, lastEvent }: { count: number; lastEvent: StoreEvent | null }) => {
      updateState(count);
      setLastEvent(lastEvent);
    }, 50);
    const subscribe = useStore.subscribe(
      (state) => {
        const events = state.getChannelEvents(channelId);
        return {
          count: events.length,
          lastEvent: events.length ? events[events.length - 1] : null,
        };
      },
      debounceCb,
      { equalityFn: shallow },
    );
    return () => {
      debounceCb.clear();
      subscribe();
    };
  }, [setEventCount, setLastEvent, channelId]);

  return {
    eventCount,
    lastEvent,
  };
};
