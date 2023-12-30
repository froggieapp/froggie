import { Kick } from "@FroggieTypes/Kick";
import { RiSwordFill, RiStarFill, RiGift2Fill, RiVerifiedBadgeFill } from "react-icons/ri";

export type KickBadgeFC = React.FC<{
  className: string | undefined;
  size: number;
}>;
export const badgeIcons: Record<Kick.SUPPORTED_KICK_BADGE, KickBadgeFC> = {
  subscriber: RiStarFill,
  sub_gifter: RiGift2Fill,
  moderator: RiSwordFill,
  verified: RiVerifiedBadgeFill,
};

export const badgeClassnames: Record<Kick.SUPPORTED_KICK_BADGE, string> = {
  subscriber: "fgr-KickBadge-icon fgr-KickBadge-subscriber",
  sub_gifter: "fgr-KickBadge-icon fgr-KickBadge-iconGifter",
  moderator: "fgr-KickBadge-icon fgr-KickBadge-iconMod",
  verified: "fgr-KickBadge-icon fgr-KickBadge-verifiedUser",
};
