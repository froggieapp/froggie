import { StoreState, useStore } from "@/react/store/Store";
import { StoreEvent } from "@/react/store/createEventStore";
import debounce from "debounce";
import React from "react";

export const useEventCountSubscribe = (channelId: string | undefined) => {
  const [eventCount, setEventCount] = React.useState(() => useStore.getState().getChannelEvents(channelId).length);
  const [lastEvent, setLastEvent] = React.useState<null | StoreEvent>(null);

  React.useEffect(() => {
    const updateState = (count: number) => {
      setEventCount(count);
    };
    const currentEventCount = useStore.getState().getChannelEvents(channelId).length;
    setEventCount(currentEventCount);
    const debounceCb = debounce((state: StoreState) => {
      const events = state.getChannelEvents(channelId);
      updateState(events.length);
      setLastEvent(events.length ? events[events.length - 1] : null);
    }, 50);
    const subscribe = useStore.subscribe(debounceCb);
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
