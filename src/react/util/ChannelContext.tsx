import { createContext, h } from "preact";
import { useContext } from "preact/hooks";
import { UserCardModal } from "../store/createModalStore";

interface KickChannelContext {
  isModerator: boolean;
  isSubscribed: boolean;
  isChannelOwner: boolean;
}

export interface ChannelContextValue {
  onSendMessage: (data: string) => void;
  profileSrc: string;
  channelName: string;
  additionalData: KickChannelContext | null;
  id: string;
  sevenTvConnectionId: string;
  UserCardContent: (data: UserCardModal["additionalData"]) => h.JSX.Element | null;
}

const ChannelContext = createContext<ChannelContextValue>({
  onSendMessage: () => {},
  UserCardContent: () => null,
  profileSrc: "",
  channelName: "",
  additionalData: null,
  id: "",
  sevenTvConnectionId: "",
});

export const useChannelContext = () => {
  return useContext(ChannelContext);
};

export const ChannelProvider = ChannelContext.Provider;
