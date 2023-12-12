import React from "react";
import { ModalButtonWrapper, ModalContent } from "../Modal";
import { useQuery } from "@tanstack/react-query";
import { getChannelInfo } from "@/react/util/API";
import { showError } from "@/react/util/util";
import { ErrorMessage } from "../ErrorMessage";
import { Input } from "../Input";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/react/store/Store";
import { useModalContext } from "../Modal/ModalContext";

export const AddChannelModalContent = () => {
  const { setIsOpen } = useModalContext();

  const [channelName, setChannelName] = React.useState("");
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setChannelName(e.currentTarget.value);
  };

  const { refetch, isLoading, error } = useQuery({
    queryKey: ["getChannelInfo", channelName],
    queryFn: () => getChannelInfo(channelName),
    refetchOnWindowFocus: false,
    enabled: false,
  });
  const navigate = useNavigate();
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
      setIsOpen(false);
      navigate(`/channel/${channelName}`);
    } catch (e) {
      showError((e as Error).message);
      console.error(e);
    }
  };

  return (
    <ModalContent>
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
    </ModalContent>
  );
};
