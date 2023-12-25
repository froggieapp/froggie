import { createContext } from "preact";
import { useContext } from "preact/hooks";

export interface ChannelContextValue {
  onSendMessage: (data: string) => void;
  profileSrc: string;
  channelName: string;
  isSubscribed: boolean;
  id: string;
  sevenTvConnectionId: string;
}

const ChannelContext = createContext<ChannelContextValue>({
  onSendMessage: () => {},
  profileSrc: "",
  channelName: "",
  isSubscribed: false,
  id: "",
  sevenTvConnectionId: "",
});

export const useChannelContext = () => {
  return useContext(ChannelContext);
};

export const ChannelProvider = ChannelContext.Provider;
