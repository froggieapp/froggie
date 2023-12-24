import { StateCreator } from "zustand";

export interface StoreEmote {
  id: string;
  value: string;
  name: string;
  src: string;
  isLocked: boolean;
}

export interface StoreEmoteCategory {
  emotes: StoreEmote[];
  src: string;
  name: string;
}

export interface EmoteState {
  emotes: Record<string, StoreEmoteCategory | undefined>;
  setChannelEmotes: (channel: string, category: StoreEmoteCategory) => void;
  clearEmotes: () => void;
}

export const createEmoteStore: StateCreator<EmoteState, [], [], EmoteState> = (set) => ({
  emotes: {},
  clearEmotes: () =>
    set(() => {
      return {
        emotes: {},
      };
    }),
  setChannelEmotes: (channel: string, category: StoreEmoteCategory) =>
    set((state) => {
      return {
        emotes: {
          ...state.emotes,
          [channel]: category,
        },
      };
    }),
});
