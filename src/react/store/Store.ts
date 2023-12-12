import { ChannelsProps, ChannelsState, createChannelsStore } from "./createChannelsStore";
import { EventProps, EventState, createEventStore } from "./createEventStore";
import { subscribeWithSelector } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

export type MainStoreProps = EventProps & ChannelsProps;
export type StoreState = EventState & ChannelsState;

export let useStore: ReturnType<typeof createMainStore>;

const createMainStore = (initProps?: MainStoreProps) =>
  createWithEqualityFn<StoreState>()(
    subscribeWithSelector((...a) => ({
      ...createEventStore(...a),
      ...createChannelsStore(...a),
      ...initProps,
    })),
    shallow,
  );

export const initializeStore = (initProps?: MainStoreProps) => {
  useStore = createMainStore(initProps);
};
