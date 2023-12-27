import { Kick } from "@FroggieTypes/Kick";
import { StateCreator } from "zustand";

export interface MessageEvent {
  id: string;
  type: "MESSAGE";
  createdOn: number;
  sender: string;
  senderNameColor: string;
  content: string;
  messageId: string;
  error?: string;
  isOptimistic?: boolean;
  isTouched?: boolean;
  // todo: figure out the abstraction of badges
  kickBadges?: Kick.KickBadges;
}

interface SocketSubscribedEvent {
  id: string;
  type: "SOCKET_SUBSCRIBED";
  createdOn: number;
}

interface GiftedSubEvent {
  id: string;
  type: "GIFTED_SUB";
  createdOn: number;
  gifter: string;
  receivers: string[];
}

export type StoreEvent = MessageEvent | SocketSubscribedEvent | GiftedSubEvent;

export interface EventProps {
  eventChannels: Record<string, StoreEvent[]>;
}

export interface EventState extends EventProps {
  addEvent: (channelId: string, event: StoreEvent) => void;
  updateEvent: (channelId: string, eventId: string, updateFn: (oldEvent: StoreEvent) => StoreEvent) => void;
}

export const createEventStore: StateCreator<EventState, [["zustand/immer", never]]> = (set) => ({
  eventChannels: {},
  addEvent: (channelId: string, event: StoreEvent) => {
    set(({ eventChannels }) => {
      if (!(channelId in eventChannels)) {
        eventChannels[channelId] = [event];
        return;
      }

      eventChannels[channelId].push(event);
    });
  },
  updateEvent: (channelId: string, eventId: string, updateFn: (oldEvent: StoreEvent) => StoreEvent) =>
    set(({ eventChannels }) => {
      return {
        eventChannels: {
          [channelId]: eventChannels[channelId]?.map((e) => (e.id === eventId ? updateFn(e) : e)) || [],
        },
      };
    }),
});
