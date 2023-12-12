import React from "react";
import { PAYLOADS } from "src/util/KickWebSocket";
import { KICK_SOCKET_PING_TIMEOUT, WEB_SOCKET_URL } from "src/util/constants";
import { getFirstUntouchedMessage, getUniqueId } from "src/util/util";
import { useWebSocket } from "./useWebSocket";
import { useStore } from "src/store/Store";
import { Kick } from "@KickerinoTypes/Kick";
import { useUser } from "./useUser";

interface RequiredData {
  id: string;
  created_on: number;
}

type ChatMessageCallback = (data: Kick.ChatMessageEvent, channelName: string) => void;
type SocketSubscribedCallback = (data: Kick.SocketSubscribedEvent & RequiredData, channelName: string) => void;
type GiftedSubCallback = (data: Kick.GiftedSubEvent & RequiredData, channelName: string) => void;

interface ChannelConnectionInfo {
  name: string;
  channelId: string;
  chatroomId: string;
}

interface ChannelWebsockedOptions {
  onChatMessage: ChatMessageCallback;
  onSubscribed: SocketSubscribedCallback;
  onGiftedSub: GiftedSubCallback;
}

export const useKickChannelWebsocket = ({ onChatMessage, onSubscribed, onGiftedSub }: ChannelWebsockedOptions) => {
  const updateEvent = useStore((state) => state.updateEvent);
  const eventsRef = React.useRef(useStore.getState().events);
  const channelCount = useStore((state) => state.channels.length);
  const pingInterval = React.useRef<null | number>(null);
  const channelsSuccessfulySubscribed = React.useRef<Record<string, boolean>>({});
  const savedOnChatMessageCallback = React.useRef<null | ChatMessageCallback>(null);
  const savedOnSubscribedCallback = React.useRef<null | SocketSubscribedCallback>(null);
  const savedOnGiftedSubCallback = React.useRef<null | GiftedSubCallback>(null);
  const subscribedChannels = React.useRef<ChannelConnectionInfo[]>([]);
  const { data: user } = useUser();
  const userId = user?.id;

  React.useEffect(
    () =>
      useStore.subscribe(
        (state) => state.events,
        (events) => {
          eventsRef.current = events;
        },
        {
          fireImmediately: true,
        },
      ),
    [],
  );

  React.useEffect(() => {
    savedOnChatMessageCallback.current = onChatMessage;
    savedOnSubscribedCallback.current = onSubscribed;
    savedOnGiftedSubCallback.current = onGiftedSub;
  });

  React.useEffect(() => {
    return () => {
      if (pingInterval.current) clearInterval(pingInterval.current);
    };
  }, []);

  const kickChannelToConnInfo = (channelOrChatroom: string) => {
    return useStore
      .getState()
      .channels?.find((c) => channelOrChatroom.includes(c.channelId) || channelOrChatroom.includes(c.chatroomId));
  };

  const parseMessageData = (data: string | undefined | null) => {
    try {
      const parsedData = data ? JSON.parse(data) : {};
      return parsedData;
    } catch (e) {
      console.error(e);
    }
  };

  const { send, socketReady } = useWebSocket(WEB_SOCKET_URL, {
    parseJSON: true,
    skip: !channelCount,
    onOpen: () => {},
    onClose: () => {
      if (pingInterval.current) clearInterval(pingInterval.current);
    },
    onBeforeClose: () => {},
    onError: (err) => {
      console.error(err);
    },
    onMessage: (sendMessage, message) => {
      if (pingInterval.current) clearInterval(pingInterval.current);
      pingInterval.current = window.setInterval(() => {
        sendMessage(PAYLOADS.ping);
      }, KICK_SOCKET_PING_TIMEOUT);
      if ("error" in message) {
        console.error("error parsing", message);
        return;
      }

      switch (message.event) {
        case Kick.EVENT_TYPES.ChatMessageEvent: {
          const parsedData = parseMessageData(message.data) as Kick.ChatMessageEvent["data"];

          if (parsedData?.sender?.id) {
            const channelInfo = kickChannelToConnInfo(message.channel);
            const channelId = channelInfo?.channelId;
            if (!channelId) {
              return;
            }

            let firstUntouchedMessage: string | null = null;
            if (
              userId &&
              parsedData.sender.id === userId &&
              (firstUntouchedMessage = getFirstUntouchedMessage(eventsRef.current[channelId], parsedData.content))
            ) {
              updateEvent(channelId, firstUntouchedMessage, (e) => ({ ...e, isTouched: true }));
              return;
            }

            if (channelInfo?.name)
              savedOnChatMessageCallback.current?.(
                {
                  ...message,
                  data: parsedData,
                },
                channelInfo.channelId,
              );
          }
          break;
        }
        case Kick.EVENT_TYPES.SocketSubscribedEvent: {
          const channelInfo = kickChannelToConnInfo(message.channel);
          if (channelInfo && !(channelInfo.channelId in channelsSuccessfulySubscribed.current)) {
            channelsSuccessfulySubscribed.current[channelInfo.channelId] = true;
            if (channelInfo)
              savedOnSubscribedCallback.current?.(
                {
                  ...message,
                  id: getUniqueId(),
                  data: {},
                  created_on: Date.now(),
                },
                channelInfo.channelId,
              );
          }
          break;
        }
        case Kick.EVENT_TYPES.GiftedSubEvent: {
          const parsedData = parseMessageData(message.data) as Kick.GiftedSubEvent["data"];
          if (parsedData) {
            const channelInfo = kickChannelToConnInfo(message.channel);
            if (channelInfo)
              savedOnGiftedSubCallback.current?.(
                {
                  ...message,
                  id: getUniqueId(),
                  data: parsedData,
                  created_on: Date.now(),
                },
                channelInfo.channelId,
              );
          }

          break;
        }
      }
    },
  });

  React.useEffect(() => {
    if (socketReady) {
      const channels = useStore.getState().channels;
      const newSubChannels: ChannelConnectionInfo[] = [];
      for (let i = 0; i < channels.length; i += 1) {
        const channel = channels[i];
        if (!subscribedChannels.current.some((c) => c.channelId === channel.channelId)) {
          send(PAYLOADS.subscribeChannel(channel.channelId), true);
          send(PAYLOADS.subscribe(channel.chatroomId), true);
          newSubChannels.push(channel);
        }
      }
      const removedSubChannels: ChannelConnectionInfo[] = [];
      for (let i = 0; i < subscribedChannels.current.length; i += 1) {
        const channel = subscribedChannels.current[i];
        if (!channels.some((c) => c.channelId === channel.channelId)) {
          send(PAYLOADS.unsubscribeChannel(channel.channelId), true);
          send(PAYLOADS.unsubscribe(channel.chatroomId), true);
          removedSubChannels.push(channel);
        }
      }
      subscribedChannels.current = [...subscribedChannels.current, ...newSubChannels].filter(
        (c) => !removedSubChannels.some((removedChannel) => removedChannel.channelId === c.channelId),
      );
    } else if (!socketReady) {
      subscribedChannels.current = [];
      channelsSuccessfulySubscribed.current = {};
    }
  }, [send, channelCount, socketReady]);
};
