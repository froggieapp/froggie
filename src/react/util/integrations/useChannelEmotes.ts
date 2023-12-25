import { useStore } from "@/react/store/Store";
import { ChannelEmoteHook } from "@/react/types/ChannelEmoteHook";
import { useEffect } from "preact/hooks";
import { useChannelContext } from "../ChannelContext";

export const useChannelEmotes = (...args: ChannelEmoteHook[]) => {
  const results = args.map((hook) => hook());
  const { channelName } = useChannelContext();
  const isLoading = results.some((r) => r.isLoading);
  useEffect(() => {
    const clearEmotes = useStore.getState().clearEmotes;
    if (!isLoading) {
      const setEmotes = useStore.getState().setEmotes;
      clearEmotes();
      const data = results.flatMap((r) => r.data);
      const order = ["global", channelName.toLowerCase(), "7tv"];
      const sortedData = data.slice().sort((c1, c2) => {
        const order1 = order.indexOf(c1.name.toLowerCase());
        const order2 = order.indexOf(c2.name.toLowerCase());
        if (order1 === order2) return 0;
        if (order1 === -1) return 1;
        if (order2 === -1) return -1;
        return order1 > order2 ? 1 : -1;
      });
      setEmotes(sortedData);
    }
    return () => {
      clearEmotes();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, channelName]);

  return isLoading;
};
