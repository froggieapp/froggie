export const PAYLOADS = {
  ping: {
    event: "pusher:ping",
    data: {},
  },
  subscribe: (channelId: string) => {
    return {
      event: "pusher:subscribe",
      data: {
        auth: "",
        channel: `chatrooms.${channelId}.v2`,
      },
    };
  },
  subscribeChannel: (channelId: string) => {
    return {
      event: "pusher:subscribe",
      data: {
        auth: "",
        channel: `channel.${channelId}`,
      },
    };
  },
  unsubscribe: (channelId: string) => {
    return {
      event: "pusher:unsubscribe",
      data: {
        channel: `chatrooms.${channelId}.v2`,
      },
    };
  },
  unsubscribeChannel: (channelId: string) => {
    return {
      event: "pusher:unsubscribe",
      data: {
        channel: `channel.${channelId}`,
      },
    };
  },
};
