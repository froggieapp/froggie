import React from "react";
import { useParams } from "react-router-dom";
import { MessageInput } from "src/components/MessageInput";
import { useShallow } from "zustand/react/shallow";
import { ChannelInfo } from "../components/ChannelInfo";
import { EmptyChannel } from "src/components/EmptyChannel";
import { useStore } from "src/store/Store";
import { ChatEvent } from "src/components/ChatEvent";
import "@styles/Channel.css";
import { useChannelInfo } from "../hooks/useChannelInfo";

export const Channel = () => {
  const params = useParams<{ id: string }>();
  const channelName = params.id ?? "";
  const { data: channelInfo, isLoading: isLoadingChannelInfo } = useChannelInfo(channelName);
  const channelId = channelInfo?.chatroom.channel_id.toString();
  const chatId = channelInfo?.chatroom.id?.toString();

  const { events } = useStore(
    useShallow((state) => ({
      events: state.getChannelEvents(channelId),
    })),
  );

  if (!channelName) {
    return <EmptyChannel />;
  }

  if (isLoadingChannelInfo) {
    return <div>loading channel...</div>;
  }

  return (
    <div className="channel">
      <ChannelInfo avatar={channelInfo?.user.profile_pic ?? ""} name={channelInfo?.user.username ?? ""} />
      <div className="message-list">
        {events.map((e) => (
          <ChatEvent event={e} key={e.id} />
        ))}
      </div>
      <MessageInput channelId={channelId} chatroomId={chatId} />
    </div>
  );
};
