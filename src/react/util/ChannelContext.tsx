import { createContext } from "preact";
import { useContext } from "preact/hooks";

export interface ChannelContextValue {
  onSendMessage: (data: string) => void;
}

const ChannelContext = createContext<ChannelContextValue>({
  onSendMessage: () => {},
});

export const useChannelContext = () => {
  return useContext(ChannelContext);
};

export const ChannelProvider = ChannelContext.Provider;
