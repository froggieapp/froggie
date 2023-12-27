import { StateCreator } from "zustand";

export interface StoreChannel {
  order: number;
  name: string;
  channelId: string;
  chatroomId: string;
  avatar: string;
}

export interface ChannelsProps {
  channels: StoreChannel[];
}

export interface ChannelsState extends ChannelsProps {
  addChannel: (name: string, avatar: string, channelId: string, chatroomId: string) => void;
  removeChannel: (name: string) => void;
}

export const createChannelsStore: StateCreator<ChannelsState, [["zustand/immer", never]]> = (set) => ({
  channels: [],
  addChannel: (name: string, avatar: string, channelId: string, chatroomId: string) =>
    set((state) => {
      if (state.channels.some((c) => c.name === name)) return;

      state.channels.push({
        order: state.channels.length + 1,
        name,
        avatar,
        channelId,
        chatroomId,
      });
    }),
  removeChannel: (name: string) =>
    set((state) => {
      state.channels = state.channels.filter((c) => c.name !== name);
    }),
});
