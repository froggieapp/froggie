import { Kick } from "@KickerinoTypes/Kick";
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
  events: Record<string, StoreEvent[]>;
}

export interface EventState extends EventProps {
  addEvent: (channelId: string, event: StoreEvent) => void;
  getChannelEvents: (channelId: string | undefined | null) => StoreEvent[];
  updateEvent: (channelId: string, eventId: string, updateFn: (oldEvent: StoreEvent) => StoreEvent) => void;
}

export const createEventStore: StateCreator<EventState, [], [], EventState> = (set, get) => ({
  events: {},
  addEvent: (channelId: string, event: StoreEvent) => {
    set(({ events }) => ({
      events: {
        ...events,
        [channelId]: channelId in events ? [...events[channelId], event] : [event],
      },
    }));
  },
  getChannelEvents: (channelId: string | undefined | null) => {
    if (!channelId) return [];
    const events = get().events;
    if (!(channelId in events)) return [];
    return events[channelId];
  },
  updateEvent: (channelId: string, eventId: string, updateFn: (oldEvent: StoreEvent) => StoreEvent) =>
    set(({ events }) => {
      return {
        events: {
          ...events,
          [channelId]: events[channelId].map((e) => (e.id === eventId ? updateFn(e) : e)),
        },
      };
    }),
});
