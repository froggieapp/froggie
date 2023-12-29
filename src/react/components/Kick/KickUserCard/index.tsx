import { UserCardModal } from "@/react/store/createModalStore";
import { useChannelContext } from "@/react/util/ChannelContext";
import { banUser, getKickUserCard } from "@/react/util/integrations/kick/API";
import { useMutation, useQuery } from "@tanstack/react-query";
import "./index.css";
import { showError, showInfo } from "@/react/util/util";
import { useStore } from "@/react/store/Store";
import { useCountdown } from "@/react/hooks/useCountdown";
import { h } from "preact";

type KickUserCardProps = UserCardModal["additionalData"];

export const KickUserCard = ({ id: userId }: KickUserCardProps) => {
  const { channelName, additionalData } = useChannelContext();
  const onClose = useStore((state) => state.closeUserCardModal);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["fetchKickUserCard", channelName, userId],
    queryFn: () => getKickUserCard(channelName, userId ?? ""),
    enabled: !!userId && !!channelName,
    refetchOnMount: "always",
  });
  const mutation = useMutation({
    mutationFn: ({
      channel,
      username,
      duration,
      permanent,
    }: {
      channel: string;
      username: string;
      duration: number;
      permanent: boolean;
    }) => {
      return banUser(channel, username, duration, permanent);
    },
    onSuccess(_, variables) {
      showInfo(`User ${userName} has been timed out for ${variables.duration}m`);
      onClose();
    },
    onError(e) {
      showError((e as Error).message);
      console.error(e);
    },
  });

  const profilePicture = data?.profile_pic;
  const userName = data?.username;
  const isModOrOwner = data?.is_channel_owner || data?.is_moderator;
  const showModActions = !!additionalData?.isModerator || !!additionalData?.isChannelOwner;
  const bannedUntil = data?.banned?.expires_at;
  const isTimed = !!bannedUntil && !data?.banned?.permanent;
  const timeoutCountdown = useCountdown(bannedUntil, () => {
    refetch();
  });

  const handleTimeout = (duration: number) => async () => {
    if (!userName) throw new Error("Loading username");
    mutation.mutate({
      duration,
      channel: channelName,
      permanent: false,
      username: userName,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error?.message) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <div className="kick-user-card-container">
        <div className="kick-user-card-content-info">
          {profilePicture ? (
            <img className="kick-user-card-profile" src={profilePicture} alt={`${userName}'s profile picture`} />
          ) : null}
          <p className="kick-user-card-name">{userName}</p>
        </div>
        <div className="kick-user-card-content-actions">
          {!isModOrOwner && showModActions && !isTimed ? (
            <div>
              <p>Timeout</p>
              <div className="kick-user-card-content-btn-group">
                <button disabled={mutation.isPending} onClick={handleTimeout(1)} className="primary-btn" type="button">
                  1m
                </button>
                <button disabled={mutation.isPending} onClick={handleTimeout(5)} className="primary-btn" type="button">
                  5m
                </button>
                <button disabled={mutation.isPending} onClick={handleTimeout(60)} className="primary-btn" type="button">
                  1hr
                </button>
              </div>
            </div>
          ) : null}
          {isTimed ? (
            <div>
              <p>Timed out</p>
              <p>{timeoutCountdown}</p>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
