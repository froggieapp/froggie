import React from "react";
import { useKickChannelWebsocket } from "src/hooks/useKickChannelWebsocket";
import { useStore } from "src/store/Store";

interface WithSocketsProps {
  children: React.ReactElement;
}

export const WithSockets: React.FC<WithSocketsProps> = ({ children }) => {
  const { addEvent } = useStore((state) => ({
    addEvent: state.addEvent,
  }));

  useKickChannelWebsocket({
    onChatMessage(messageData, sourceChannel) {
      if (messageData.data) {
        addEvent(sourceChannel, {
          id: messageData.data.id,
          messageId: messageData.data.id,
          type: "MESSAGE",
          senderNameColor: messageData.data.sender?.identity.color || "",
          createdOn: Number(messageData.data.created_at),
          sender: messageData.data.sender?.slug || messageData.data.sender?.username || "",
          content: messageData.data.content,
        });
      }
    },
    onSubscribed(socketSubData, sourceChannel) {
      if (socketSubData.data)
        addEvent(sourceChannel, {
          id: socketSubData.id,
          type: "SOCKET_SUBSCRIBED",
          createdOn: socketSubData.created_on,
        });
    },
    onGiftedSub(giftedSubData, sourceChannel) {
      if (giftedSubData.data) {
        addEvent(sourceChannel, {
          id: giftedSubData.id,
          type: "GIFTED_SUB",
          createdOn: giftedSubData.created_on,
          gifter: giftedSubData.data.gifter_username,
          receivers: giftedSubData.data.gifted_usernames,
        });
      }
    },
  });

  return children;
};
