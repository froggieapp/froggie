import React from "react";
import { useParams } from "react-router-dom";
import { MessageInput } from "src/components/MessageInput";
import { ChannelInfo } from "../components/ChannelInfo";
import { EmptyChannel } from "src/components/EmptyChannel";
import "@styles/Channel.css";
import { useChannelInfo } from "../hooks/useChannelInfo";
import { ChatMessageList } from "../components/ChatMessageList";

export const Channel = () => {
  const params = useParams<{ id: string }>();
  const channelName = params.id ?? "";
  const { data: channelInfo, isLoading: isLoadingChannelInfo } = useChannelInfo(channelName);
  const channelId = channelInfo?.chatroom.channel_id.toString();
  const chatId = channelInfo?.chatroom.id?.toString();

  if (!channelName) {
    return <EmptyChannel />;
  }

  if (isLoadingChannelInfo) {
    return <div>loading channel...</div>;
  }

  return (
    <div className="channel">
      <ChannelInfo avatar={channelInfo?.user.profile_pic ?? ""} name={channelInfo?.user.username ?? ""} />
      <ChatMessageList channelId={channelId} />
      <MessageInput channelId={channelId} chatroomId={chatId} />
    </div>
  );
};
