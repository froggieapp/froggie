import { h } from "preact";
import { ChangeEvent } from "preact/compat";
import { useState } from "preact/hooks";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useQuery } from "@tanstack/react-query";
import { getChannelInfo } from "../util/integrations/kick/API";
import { ErrorMessage } from "../components/ErrorMessage";
import { showError } from "../util/util";
import { useLocation } from "wouter-preact";
import "../styles/pages/Overlay.css";

export const Overlay = () => {
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
      setLocation(`/channel-overlay/${channelName}`);
    } catch (e) {
      showError((e as Error).message);
      console.error(e);
    }
  };

  return (
    <div className="fgr-Overlay">
      <Input label="Channel name">
        <input type="text" value={channelName} onChange={handleChange} />
        <ErrorMessage>{error?.message}</ErrorMessage>
      </Input>
      <Button disabled={isLoading} onClick={onAddChannel}>
        Start Overlay
      </Button>
    </div>
  );
};
