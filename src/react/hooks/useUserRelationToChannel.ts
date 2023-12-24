import { useQuery } from "@tanstack/react-query";
import { getUserRelationToChannel } from "../util/API";

export const useUserRelationToChannel = (channelName: string) => {
  return useQuery({
    queryKey: ["getUserRelationToChannel", channelName],
    queryFn: () => getUserRelationToChannel(channelName),
  });
};
