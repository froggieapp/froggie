import { create } from "zustand";
import { ChannelsProps, ChannelsState, createChannelsStore } from "./createChannelsStore";
import { EventProps, EventState, createEventStore } from "./createEventStore";
import { subscribeWithSelector } from "zustand/middleware";

export type MainStoreProps = EventProps & ChannelsProps;
type StoreState = EventState & ChannelsState;

export let useStore: ReturnType<typeof createMainStore>;

const createMainStore = (initProps?: MainStoreProps) =>
  create<StoreState>()(
    subscribeWithSelector((...a) => ({
      ...createEventStore(...a),
      ...createChannelsStore(...a),
      ...initProps,
    })),
  );

export const initializeStore = (initProps?: MainStoreProps) => {
  useStore = createMainStore(initProps);
};
