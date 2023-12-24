import { h } from "preact";
import { MessageInput } from "src/components/MessageInput";
import { ChannelInfo } from "../components/ChannelInfo";
import { EmptyChannel } from "src/components/EmptyChannel";
import "@styles/Channel.css";
import { useChannelInfo } from "../hooks/useChannelInfo";
import { ChatMessageList } from "../components/ChatMessageList";
import { useParams } from "wouter-preact";
import { useKickChannelEmotes } from "../hooks/useKickChannelEmotes";
import { useUserRelationToChannel } from "../hooks/useUserRelationToChannel";
import { ChannelContextValue, ChannelProvider } from "../util/ChannelContext";
import { useMemo } from "preact/hooks";
import { useSendMessage } from "../hooks/useSendMessage";
import { useUser } from "../hooks/useUser";
import { showInfo } from "../util/util";

export const Channel = () => {
  const params = useParams<{ id: string }>();
  const channelName = params.id ?? "";
  const { data: channelInfo, isLoading: isLoadingChannelInfo } = useChannelInfo(channelName);
  const { data: userChannelInfo, isLoading: isLoadingUserChannelInfo } = useUserRelationToChannel(channelName);
  const channelId = channelInfo?.chatroom.channel_id.toString();
  const chatId = channelInfo?.chatroom.id?.toString();
  useKickChannelEmotes(channelName, isLoadingUserChannelInfo ? false : !!userChannelInfo?.subscription?.channel);
  const { data: user } = useUser();
  const username = user?.username;
  const { mutate } = useSendMessage();

  const channelContextValue: ChannelContextValue = useMemo(
    () => ({
      onSendMessage:
        chatId && username && channelId
          ? (data: string) =>
              mutate({
                sender: username,
                senderNameColor: "#fff",
                kickBadges: [],
                chatroomId: chatId,
                channelId,
                content: data,
              })
          : () => showInfo("Loading..."),
    }),
    [channelId, chatId, username, mutate],
  );

  if (!channelName) {
    return <EmptyChannel />;
  }

  if (isLoadingChannelInfo) {
    return <div>loading channel...</div>;
  }

  return (
    <ChannelProvider value={channelContextValue}>
      <div className="channel">
        <ChannelInfo avatar={channelInfo?.user.profile_pic ?? ""} name={channelInfo?.user.username ?? ""} />
        <ChatMessageList key={channelId} channelId={channelId} />
        <MessageInput />
      </div>
    </ChannelProvider>
  );
};
