export interface GetUserRelationToChannelResult {
  id: number;
  username: string;
  slug: string;
  profile_pic: string;
  is_staff: boolean;
  is_channel_owner: boolean;
  is_moderator: boolean;
  badges: unknown[];
  following_since: string;
  subscribed_for: number;
  banned: null | {
    created_at: string;
    reason: string;
    expires_at: string;
    permanent: boolean;
  };
}
