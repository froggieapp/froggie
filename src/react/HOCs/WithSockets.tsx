import { Kick } from "@FroggieTypes/Kick";
import { VNode } from "preact";
import { useKickChannelWebsocket } from "src/hooks/useKickChannelWebsocket";
import { useStore } from "src/store/Store";

interface WithSocketsProps {
  children: VNode;
}

export const WithSockets: React.FC<WithSocketsProps> = ({ children }) => {
  const { addEvent } = useStore((state) => ({
    addEvent: state.addEvent,
  }));

  useKickChannelWebsocket({
    onChatMessage(messageData, sourceChannel) {
      if (messageData.data?.id) {
        addEvent(sourceChannel, {
          id: messageData.data.id,
          messageId: messageData.data.id,
          type: "MESSAGE",
          senderId: messageData.data.sender?.id?.toString() ?? "",
          senderNameColor: messageData.data.sender?.identity.color || "",
          createdOn: Number(messageData.data.created_at),
          sender: messageData.data.sender?.username || messageData.data.sender?.slug || "",
          content: messageData.data.content,
          kickBadges: messageData.data.sender?.identity?.badges?.filter((b) =>
            Kick.SUPPORTED_KICK_BADGES.includes(b.type),
          ),
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
