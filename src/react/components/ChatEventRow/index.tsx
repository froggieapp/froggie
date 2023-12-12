import { Message } from "../Message";
import React from "react";
import "./index.css";
import { useStore } from "@/react/store/Store";
import { StoreEvent } from "@/react/store/createEventStore";

export interface ChatEventRowProps {
  index: number;
  channelName: string | undefined;
}
export const ChatEventRow = React.forwardRef<HTMLDivElement, ChatEventRowProps>(({ index, channelName }, ref) => {
  const event: StoreEvent | undefined = useStore((state) => state.getChannelEvents(channelName)[index]);

  const renderEvent = () => {
    switch (event.type) {
      case "MESSAGE": {
        return <Message error={event.error} senderName={event.sender} content={event.content} />;
      }
      case "SOCKET_SUBSCRIBED": {
        return <p className="socket-subscribed info-chat-event">Connected successfuly</p>;
      }
      case "GIFTED_SUB": {
        return (
          <p className="gifted-sub info-chat-event">
            <span className="gifted-sub-gifter">{event.gifter}</span>
            <span>has gifted a sub to</span>
            <span className="gifted-sub-receiver">{event.receivers.join(", ")}</span>
          </p>
        );
      }
    }
  };
  return (
    <div className="event-wrapper" data-index={index} ref={ref}>
      {event ? renderEvent() : null}
    </div>
  );
});

ChatEventRow.displayName = "ChatEventRow";
