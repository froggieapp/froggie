import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { h } from "preact";
import "./index.css";
import { onOpen } from "../MicroModalWrapper";
import { ADD_CHANNEL_MODAL } from "@/react/util/modals";

export const EmptyChannel = () => {
  const onClick = () => {
    onOpen(ADD_CHANNEL_MODAL);
  };
  
  return (
    <button onClick={onClick} type="button" className="empty-channel">
      <p className="empty-channel-heading">Add a channel</p>
      <p className="empty-channel-alt">Seems like it&apos;s your first time in here, click here to add a new channel</p>
      <PlusCircleIcon className="plus-channel-icon" />
    </button>
  );
};
