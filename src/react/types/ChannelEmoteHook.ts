import { StoreEmoteCategory } from "../store/createEmoteStore";

export type ChannelEmoteHook = () => {
  isLoading: boolean;
  data: StoreEmoteCategory | StoreEmoteCategory[];
};
