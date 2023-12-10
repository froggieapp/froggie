import { StoreEvent } from "src/store/createEventStore";
import { Message } from "../Message";
import React from "react";
import "./index.css";

interface ChatEventProps {
  event: StoreEvent;
}

export const ChatEvent: React.FC<ChatEventProps> = ({ event }) => {
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

  return null;
};
