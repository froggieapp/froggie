import { useMutation } from "@tanstack/react-query";
import { getUniqueId } from "../util/util";
import { useStore } from "../store/Store";
import { MessageEvent } from "@/react/store/createEventStore";
import { sendMessage } from "../util/integrations/kick/API";
import { Kick } from "@FroggieTypes/Kick";

interface MessageInfo {
  sender: string;
  senderId: string;
  senderNameColor: string;
  kickBadges: Kick.KickBadges;
  chatroomId: string;
  channelId: string;
  content: string;
}

export const useSendMessage = () => {
  return useMutation({
    mutationFn: (msg: MessageInfo) => {
      return sendMessage(msg.chatroomId, msg.content);
    },
    onMutate: async (variables) => {
      const optimisticMessage: MessageEvent = {
        id: `temp-${getUniqueId()}`,
        senderId: variables.senderId,
        messageId: "",
        createdOn: Date.now(),
        sender: variables.sender,
        content: variables.content,
        senderNameColor: variables.senderNameColor,
        type: "MESSAGE",
        isOptimistic: true,
        kickBadges: variables.kickBadges,
      };
      useStore.getState().addEvent(variables.channelId, optimisticMessage);
      return { optimisticMessage };
    },
    onError(error, variables, context) {
      if (!context?.optimisticMessage.id) return;
      useStore.getState().updateEvent(variables.channelId, context.optimisticMessage.id, (e) => ({
        ...e,
        error: error.message,
      }));
    },
    onSuccess: (result, variables, context) => {
      if (!result?.data.id || !context?.optimisticMessage.id) return;
      useStore.getState().updateEvent(variables.channelId, context.optimisticMessage.id, (e) => ({
        ...e,
        messageId: result.data.id,
      }));
    },
  });
};
