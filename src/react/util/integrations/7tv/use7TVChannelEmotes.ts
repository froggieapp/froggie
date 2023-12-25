import { StoreEmoteCategory } from "@/react/store/createEmoteStore";
import { ChannelEmoteHook } from "@/react/types/ChannelEmoteHook";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "preact/hooks";
import { get7TVEmotes } from "./7TVAPI";
import { useChannelContext } from "../../ChannelContext";

export const getUse7TVChannelEmotes: (platform: string) => ChannelEmoteHook = (platform) => () => {
  const { profileSrc, channelName, sevenTvConnectionId } = useChannelContext();
  const { data, isLoading } = useQuery({
    queryKey: ["get7TVEmotes", sevenTvConnectionId, platform, channelName],
    queryFn: () => get7TVEmotes(sevenTvConnectionId, platform),
    enabled: !!sevenTvConnectionId && !!platform,
  });

  const emoteCategories: StoreEmoteCategory[] = useMemo(() => {
    if (!data || isLoading) return [];
    return [
      {
        src: "",
        name: "7TV",
        id: `7TV${channelName}`,
        emotes: data.map((e: { id: string; name: string }) => ({
          id: e.id,
          value: e.name,
          name: e.name,
          src: `https://cdn.7tv.app/emote/${e.id}/4x.avif`,
          isLocked: false,
        })),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, profileSrc, channelName]);

  return {
    isLoading,
    data: emoteCategories,
  };
};
