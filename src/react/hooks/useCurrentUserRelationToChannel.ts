import { useQuery } from "@tanstack/react-query";
import { getUserCurrentRelationToChannel } from "../util/integrations/kick/API";

export const useCurrentUserRelationToChannel = (channelName: string) => {
  return useQuery({
    queryKey: ["getUserCurrentRelationToChannel", channelName],
    queryFn: () => getUserCurrentRelationToChannel(channelName),
  });
};
