import { useQuery } from "@tanstack/react-query";
import { useMemo } from "preact/hooks";
import { getEmotes } from "./API";
import { useChannelContext } from "../../ChannelContext";
import { parseKickEmotesToStore } from "../../parseKickEmotesToStore";
import { StoreEmoteCategory } from "@/react/store/createEmoteStore";
import { ChannelEmoteHook } from "@/react/types/ChannelEmoteHook";

export const useKickChannelEmotes: ChannelEmoteHook = () => {
  const { channelName, isSubscribed } = useChannelContext();

  const { data, isLoading } = useQuery({
    queryKey: ["getEmotes", channelName],
    queryFn: () => getEmotes(channelName as string),
    enabled: !!channelName,
  });

  const emotes = useMemo(() => {
    if (!isLoading && data && channelName) {
      const categories: StoreEmoteCategory[] = [];
      for (let i = 0; i < data.length; i += 1) {
        const channelInfo = data[i];
        const isKickGlobalEmote = channelInfo.id === "Global" || channelInfo.id === "Emoji";
        const isActiveChannel = channelInfo.user?.username?.toLowerCase() === channelName.toLowerCase();

        const parsedEmotes = parseKickEmotesToStore(
          channelInfo.emotes,
          isKickGlobalEmote || !isActiveChannel || (isActiveChannel && isSubscribed),
        );

        const categoryName = isKickGlobalEmote ? "Global" : channelInfo.user?.username || "";
        if (categoryName && !categories.some((c) => c.name === categoryName)) {
          categories.push({
            id: `${categoryName}-${i}`,
            src: isKickGlobalEmote ? "" : channelInfo?.user?.profile_pic || "",
            emotes: parsedEmotes,
            name: categoryName,
          });
        }
      }
      return categories;
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelName, isLoading, isSubscribed]);

  return {
    isLoading,
    data: emotes,
  };
};
