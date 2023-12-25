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
  id: string;
}

export interface EmoteState {
  emotes: StoreEmoteCategory[];
  setEmotes: (data: StoreEmoteCategory[]) => void;
  clearEmotes: () => void;
}

export const createEmoteStore: StateCreator<EmoteState, [], [], EmoteState> = (set) => ({
  emotes: [],
  clearEmotes: () =>
    set(() => {
      return {
        emotes: [],
      };
    }),
  setEmotes: (data: StoreEmoteCategory[]) =>
    set(() => {
      return {
        emotes: data,
      };
    }),
});
