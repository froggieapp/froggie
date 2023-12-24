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
  subscriber: "kick-badge-icon kick-badge-icon-subscriber",
  sub_gifter: "kick-badge-icon kick-badge-icon-gifter",
  moderator: "kick-badge-icon-text",
  verified: "kick-badge-icon kick-badge-icon-verified-user",
};
