import { ChannelsProps, ChannelsState, createChannelsStore } from "./createChannelsStore";
import { EventProps, EventState, createEventStore } from "./createEventStore";
import { subscribeWithSelector } from "zustand/middleware";
import { EmoteState, createEmoteStore } from "./createEmoteStore";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { ModalState, createModalStore } from "./createModalStore";

export type MainStoreProps = EventProps & ChannelsProps;
export type StoreState = EventState & ChannelsState & EmoteState & ModalState;

export let useStore: ReturnType<typeof createMainStore>;

const createMainStore = (initProps?: MainStoreProps) =>
  create<StoreState>()(
    immer(
      subscribeWithSelector((...a) => ({
        ...createEventStore(...a),
        ...createChannelsStore(...a),
        ...createEmoteStore(...a),
        ...createModalStore(...a),
        ...initProps,
      })),
    ),
  );

export const initializeStore = (initProps?: MainStoreProps) => {
  useStore = createMainStore(initProps);
};
