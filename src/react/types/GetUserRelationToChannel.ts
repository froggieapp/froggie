export interface GetUserRelationToChannelResult {
  subscription: null | {
    channel: {
      slug: string;
      username: string;
      profile_image: string;
      banner_image: {
        srcset: string;
        src: string;
      };
      origin: string;
      duration: number;
      type: "gift"; // there are probalby other types
      status: "active"; // there are probalby other status
      expires_at: string;
    };
  };
  is_super_admin: boolean;
  is_following: boolean;
  following_since: unknown;
  is_broadcaster: boolean;
  is_moderator: boolean;
  leaderboards: Leaderboards;
  banned: unknown;
  has_notifications: boolean;
}

export interface Leaderboards {
  gifts: Gifts;
}

export interface Gifts {
  quantity: number;
}
