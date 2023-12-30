import { Kick } from "@FroggieTypes/Kick";
import { IconSword, IconGiftFilled, IconStarFilled, IconDiscountCheckFilled } from "@tabler/icons-react";

export type KickBadgeFC = React.FC<{
  className: string | undefined;
  size: number;
}>;
export const badgeIcons: Record<Kick.SUPPORTED_KICK_BADGE, KickBadgeFC> = {
  subscriber: IconStarFilled,
  sub_gifter: IconGiftFilled,
  moderator: IconSword,
  verified: IconDiscountCheckFilled,
};

export const badgeClassnames: Record<Kick.SUPPORTED_KICK_BADGE, string> = {
  subscriber: "fgr-KickBadge-icon fgr-KickBadge-subscriber",
  sub_gifter: "fgr-KickBadge-icon fgr-KickBadge-iconGifter",
  moderator: "fgr-KickBadge-text",
  verified: "fgr-KickBadge-icon fgr-KickBadge-verifiedUser",
};
