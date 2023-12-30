import { UserCardModal } from "@/react/store/createModalStore";
import { useChannelContext } from "@/react/util/ChannelContext";
import { banUser, getKickUserCard } from "@/react/util/integrations/kick/API";
import { useMutation, useQuery } from "@tanstack/react-query";
import "./index.css";
import { showError, showInfo } from "@/react/util/util";
import { useStore } from "@/react/store/Store";
import { useCountdown } from "@/react/hooks/useCountdown";
import { h } from "preact";
import { Button } from "../../Button";

type KickUserCardProps = UserCardModal["additionalData"];

export const KickUserCard = ({ id: userId }: KickUserCardProps) => {
  const { channelName, additionalData } = useChannelContext();
  const onClose = useStore((state) => state.closeUserCardModal);

  const { data, isLoading, isFetching, error, refetch, isPending } = useQuery({
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

  if (isLoading || isFetching || isPending) {
    return <div>Loading...</div>;
  }

  if (error?.message) {
    return <p>{error.message}</p>;
  }

  const showTimeoutButtons = !isModOrOwner && showModActions && !isTimed;

  return (
    <>
      <div className="fgr-KickUserCard">
        <div className="fgr-KickUserCard-kickUserCardContentInfo">
          {profilePicture ? (
            <img
              className="fgr-KickUserCard-userCardProfile"
              src={profilePicture}
              alt={`${userName}'s profile picture`}
            />
          ) : null}
          <p className="fgr-KickUserCard-kickUserCardName">{userName}</p>
        </div>
        {showTimeoutButtons || isTimed ? (
          <>
            <div className="fgr-KickUserCard-kickUserCardActions">
              {showTimeoutButtons ? (
                <div className="fgr-KickUserCard-kickUserCardActionsGroup">
                  <p>Timeout</p>
                  <div className="fgr-KickUserCard-contentBtnGroup">
                    <Button disabled={mutation.isPending} onClick={handleTimeout(1)}>
                      1m
                    </Button>
                    <Button disabled={mutation.isPending} onClick={handleTimeout(5)}>
                      5m
                    </Button>
                    <Button disabled={mutation.isPending} onClick={handleTimeout(60)}>
                      1hr
                    </Button>
                  </div>
                </div>
              ) : null}
              {isTimed ? (
                <div className="fgr-KickUserCard-kickUserCardActionsGroup">
                  <p>Timed out</p>
                  <p>{timeoutCountdown}</p>
                </div>
              ) : null}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};
