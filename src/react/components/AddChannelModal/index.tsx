import { ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { getChannelInfo } from "@/react/util/API";
import { showError } from "@/react/util/util";
import { ErrorMessage } from "../ErrorMessage";
import { Input } from "../Input";
import { useStore } from "@/react/store/Store";
import { MicroModalWrapper, onClose } from "../MicroModalWrapper";
import { ADD_CHANNEL_MODAL } from "@/react/util/modals";
import { ModalButtonWrapper } from "../MicroModalWrapper/ModalButtonWrapper";
import { useLocation } from "wouter-preact";
import { h } from "preact";
import { useState } from "preact/hooks";

export const AddChannelModal = () => {
  const [channelName, setChannelName] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChannelName(e.currentTarget.value);
  };

  const { refetch, isLoading, error } = useQuery({
    queryKey: ["getChannelInfo", channelName],
    queryFn: () => getChannelInfo(channelName),
    refetchOnWindowFocus: false,
    enabled: false,
  });
  const setLocation = useLocation()[1];
  const addChannel = useStore((state) => state.addChannel);

  const onAddChannel = async () => {
    if (!channelName) return;
    try {
      const newChannel = await refetch();
      if (newChannel.error?.message) {
        throw new Error(newChannel.error.message);
      }
      if (!newChannel?.data?.id) {
        throw new Error("Could not find your channel.");
      }
      // todo: simplify this to just use save settings
      await window.electronAPI.addChannel({
        name: channelName,
        avatar: newChannel.data.user.profile_pic,
        chatroomId: newChannel.data.chatroom.id?.toString(),
        channelId: newChannel.data.chatroom.channel_id?.toString(),
      });
      addChannel(
        newChannel.data.user.username,
        newChannel.data.user.profile_pic,
        newChannel.data.chatroom.channel_id?.toString(),
        newChannel.data.chatroom.id?.toString(),
      );
      onClose(ADD_CHANNEL_MODAL);
      setLocation(`/channel/${channelName}`);
    } catch (e) {
      showError((e as Error).message);
      console.error(e);
    }
  };

  return (
    <MicroModalWrapper
      id={ADD_CHANNEL_MODAL}
      title="New Channel"
      description="Add a new channel and start spam immediately"
    >
      <Input label="Channel name">
        <input type="text" value={channelName} onChange={handleChange} />
      </Input>
      <div>
        <ErrorMessage>{error?.message}</ErrorMessage>
        <ModalButtonWrapper>
          <button disabled={isLoading} onClick={onAddChannel} type="button" className="primary-btn">
            Add channel
          </button>
        </ModalButtonWrapper>
      </div>
    </MicroModalWrapper>
  );
};
