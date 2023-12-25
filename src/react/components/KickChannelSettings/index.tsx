import { useChannelInfo } from "@/react/hooks/useChannelInfo";
import { useSendMessage } from "@/react/hooks/useSendMessage";
import { useUser } from "@/react/hooks/useUser";
import { useUserRelationToChannel } from "@/react/hooks/useUserRelationToChannel";
import { ChannelContextValue, ChannelProvider } from "@/react/util/ChannelContext";
import { showInfo } from "@/react/util/util";
import { ComponentChildren, h } from "preact";
import { useMemo } from "preact/hooks";
import { useParams } from "wouter-preact";

interface KickChannelSettingsProps {
  children: ComponentChildren;
}

export const KickChannelSettings = ({ children }: KickChannelSettingsProps) => {
  const params = useParams<{ id: string }>();
  const channelName = params.id ?? "";
  const { data: channelInfo, isLoading: isLoadingChannelInfo } = useChannelInfo(channelName);
  const { data: userChannelInfo, isLoading: isLoadingUserChannelInfo } = useUserRelationToChannel(channelName);
  const channelId = channelInfo?.chatroom.channel_id.toString() ?? "";
  const chatId = channelInfo?.chatroom.id?.toString();
  const userId = channelInfo?.user_id.toString() ?? "";
  const channelProfile = channelInfo?.user.profile_pic ?? "";
  const { data: user } = useUser();
  const username = user?.username;
  const { mutate } = useSendMessage();
  const isSubscribed = isLoadingUserChannelInfo ? false : !!userChannelInfo?.subscription?.channel;

  const channelContextValue: ChannelContextValue = useMemo(
    () => ({
      sevenTvConnectionId: userId,
      profileSrc: channelProfile,
      channelName,
      id: channelId,
      isSubscribed,
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
    [channelId, userId, chatId, username, channelName, isSubscribed, mutate, channelProfile],
  );

  if (isLoadingChannelInfo) {
    return <div>loading channel...</div>;
  }

  return <ChannelProvider value={channelContextValue}>{children}</ChannelProvider>;
};
