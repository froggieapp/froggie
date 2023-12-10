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

export const createChannelsStore: StateCreator<ChannelsState, [], [], ChannelsState> = (set) => ({
  channels: [],
  addChannel: (name: string, avatar: string, channelId: string, chatroomId: string) =>
    set((state) => {
      if (state.channels.some((c) => c.name === name)) return state;
      return {
        channels: [
          ...state.channels,
          {
            order: state.channels.length + 1,
            name,
            avatar,
            channelId,
            chatroomId,
          },
        ],
      };
    }),
  removeChannel: (name: string) =>
    set((state) => {
      return {
        ...state,
        channels: state.channels.filter((c) => c.name !== name),
      };
    }),
});
