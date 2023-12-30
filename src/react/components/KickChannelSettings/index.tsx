import { useChannelInfo } from "@/react/hooks/useChannelInfo";
import { useSendMessage } from "@/react/hooks/useSendMessage";
import { useUser } from "@/react/hooks/useUser";
import { useCurrentUserRelationToChannel } from "@/react/hooks/useCurrentUserRelationToChannel";
import { ChannelContextValue, ChannelProvider } from "@/react/util/ChannelContext";
import { showInfo } from "@/react/util/util";
import { ComponentChildren, h } from "preact";
import { useMemo } from "preact/hooks";
import { useParams } from "wouter-preact";
import { KickUserCard } from "../Kick/KickUserCard";
import { memo } from "preact/compat";

interface KickChannelSettingsProps {
  children: ComponentChildren;
}

const _KickChannelSettings = ({ children }: KickChannelSettingsProps) => {
  const params = useParams<{ id: string }>();
  const channelName = params.id ?? "";
  const { data: channelInfo, isLoading: isLoadingChannelInfo } = useChannelInfo(channelName);
  const { data: userChannelInfo, isLoading: isLoadingUserChannelInfo } = useCurrentUserRelationToChannel(channelName);
  const channelId = channelInfo?.chatroom.channel_id.toString() ?? "";
  const chatId = channelInfo?.chatroom.id?.toString();
  const userId = channelInfo?.user_id.toString() ?? "";
  const channelProfile = channelInfo?.user.profile_pic ?? "";
  const { data: user } = useUser();
  const currentUserId = user?.id?.toString() ?? "";
  const username = user?.username;
  const { mutate } = useSendMessage();
  const isSubscribed = isLoadingUserChannelInfo ? false : !!userChannelInfo?.subscription?.channel;
  const isMod = !!userChannelInfo?.is_moderator;
  const isChannelOwner = !!currentUserId && channelInfo?.user_id.toString() === currentUserId;
  const channelContextValue: ChannelContextValue = useMemo(() => {
    return {
      sevenTvConnectionId: userId,
      profileSrc: channelProfile,
      channelName,
      id: channelId,
      UserCardContent: KickUserCard,
      additionalData: {
        isModerator: isMod,
        isSubscribed,
        isChannelOwner,
      },
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
                senderId: currentUserId,
              })
          : () => showInfo("Loading..."),
    };
  }, [
    channelId,
    userId,
    currentUserId,
    chatId,
    username,
    channelName,
    isSubscribed,
    mutate,
    channelProfile,
    isMod,
    isChannelOwner,
  ]);

  if (isLoadingChannelInfo) {
    return <div>loading channel...</div>;
  }

  return <ChannelProvider value={channelContextValue}>{children}</ChannelProvider>;
};

export const KickChannelSettings = memo(_KickChannelSettings);
