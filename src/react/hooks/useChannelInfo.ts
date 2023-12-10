import { useQuery } from "@tanstack/react-query";
import { getChannelInfo } from "../util/API";

export const useChannelInfo = (channelName: string) => {
  return useQuery({
    queryKey: ["getChannelInfo", channelName],
    queryFn: () => getChannelInfo(channelName),
  });
};
