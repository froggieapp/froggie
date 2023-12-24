export type GetKickEmotes = GetEmotesResult[] | undefined;

interface GetEmotesResult {
  id: string;
  user_id?: number;
  slug?: string;
  is_banned?: boolean;
  playback_url?: string;
  name_updated_at?: string;
  vod_enabled?: boolean;
  subscription_enabled?: boolean;
  emotes: Emote[];
  can_host?: boolean;
  user?: User;
  name?: string;
}

interface Emote {
  id: number;
  channel_id?: number;
  name: string;
  subscribers_only: boolean;
}

interface User {
  id: number;
  username: string;
  agreed_to_terms: boolean;
  email_verified_at: string;
  bio: string;
  country: string;
  state: string;
  city: string;
  instagram: string;
  twitter: string;
  youtube: string;
  discord: string;
  tiktok: string;
  facebook: string;
  profile_pic: string;
}
