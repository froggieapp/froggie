import { StoreState, useStore } from "@/react/store/Store";
import debounce from "debounce";
import React from "react";

export const useEventCountSubscribe = (channelId: string | undefined) => {
  const [eventCount, setEventCount] = React.useState(() => useStore.getState().getChannelEvents(channelId).length);

  React.useEffect(() => {
    const updateState = (count: number) => {
      setEventCount(count);
    };
    const currentEventCount = useStore.getState().getChannelEvents(channelId).length;
    setEventCount(currentEventCount);
    const debounceCb = debounce((state: StoreState) => updateState(state.getChannelEvents(channelId).length), 50);
    const subscribe = useStore.subscribe(debounceCb);
    return () => {
      debounceCb.clear();
      subscribe();
    };
  }, [setEventCount, channelId]);

  return eventCount;
};
