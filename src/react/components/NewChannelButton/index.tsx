import { PlusIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Tooltip } from "../Tooltip";
import "./index.css";
import { ModalButton, ModalProvider } from "../Modal";
import { AddChannelModalContent } from "../AddChannelModalContent";

export const NewChannelButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <ModalProvider
      title="New Channel"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      description="Add a new channel and start spam immediately"
    >
      <Tooltip tag={"div"} position="right" label={"Add Channel"}>
        <ModalButton>
          <button className="new-channel-button" type="button">
            <PlusIcon />
          </button>
        </ModalButton>
      </Tooltip>
      <AddChannelModalContent />
    </ModalProvider>
  );
};
