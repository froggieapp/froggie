import { h } from "preact";
import { MessageInput } from "src/components/MessageInput";
import { ChannelInfo } from "../components/ChannelInfo";
import { EmptyChannel } from "src/components/EmptyChannel";
import "@styles/pages/Channel.css";
import { ChatMessageList } from "../components/ChatMessageList";
import { useChannelContext } from "../util/ChannelContext";
import { useChannelEmotes } from "../util/integrations/useChannelEmotes";
import { useKickChannelEmotes } from "../util/integrations/kick/useKickChannelEmotes";
import { useKick7TVEmotes } from "../util/integrations/kick/useKick7TVEmotes";
import { KickChannelSettings } from "../components/KickChannelSettings";
import { UserCard } from "../components/UserCardTooltiper";

const ChannelComponent = () => {
  const { id, profileSrc, channelName } = useChannelContext();

  useChannelEmotes(useKickChannelEmotes, useKick7TVEmotes);

  if (!channelName) {
    return <EmptyChannel />;
  }

  return (
    <div className="fgr-Channel">
      <ChannelInfo avatar={profileSrc ?? ""} name={channelName ?? ""} />
      <ChatMessageList key={id} channelId={id} />
      <MessageInput />
    </div>
  );
};

export const Channel = () => {
  return (
    <KickChannelSettings>
      <UserCard />
      <ChannelComponent />
    </KickChannelSettings>
  );
};
