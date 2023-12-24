import { useQuery } from "@tanstack/react-query";
import { getEmotes } from "../util/API";
import { useStore } from "../store/Store";
import { parseKickEmotesToStore } from "../util/parseKickEmotesToStore";
import { useEffect } from "preact/hooks";

export const useKickChannelEmotes = (channelName: string | undefined, isSubscribed: boolean) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getEmotes", channelName],
    queryFn: () => getEmotes(channelName as string),
    enabled: !!channelName,
  });

  useEffect(() => {
    if (!isLoading && data && channelName) {
      const setChannelEmotes = useStore.getState().setChannelEmotes;
      const clearEmotes = useStore.getState().clearEmotes;
      clearEmotes();
      for (let i = 0; i < data.length; i += 1) {
        const channelInfo = data[i];
        const isKickGlobalEmote = channelInfo.id === "Global" || channelInfo.id === "Emoji";
        const isActiveChannel = channelInfo.user?.username?.toLowerCase() === channelName.toLowerCase();

        const parsedEmotes = parseKickEmotesToStore(
          channelInfo.emotes,
          isKickGlobalEmote || !isActiveChannel || (isActiveChannel && isSubscribed),
        );
        if (isKickGlobalEmote) {
          setChannelEmotes("kick-global", {
            src: "",
            emotes: parsedEmotes,
            name: "kick-global",
          });
        } else if (channelInfo.user?.username) {
          setChannelEmotes(channelInfo.user.username, {
            src: channelInfo.user.profile_pic,
            emotes: parsedEmotes,
            name: channelInfo.user.username,
          });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, channelName, isSubscribed]);

  return isLoading;
};
