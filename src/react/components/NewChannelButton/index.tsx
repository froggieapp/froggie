import { PlusIcon } from "@heroicons/react/24/solid";
import { h } from "preact";
import { Tooltip } from "../Tooltip";
import "./index.css";
import { onOpen } from "../MicroModalWrapper";
import { ADD_CHANNEL_MODAL } from "@/react/util/modals";

export const NewChannelButton = () => {
  const onClick = () => {
    onOpen(ADD_CHANNEL_MODAL);
  };
  return (
    <Tooltip position="right" label={"Add Channel"}>
      <button onClick={onClick} className="new-channel-button saved-channel light-shadow" type="button">
        <PlusIcon />
      </button>
    </Tooltip>
  );
};
