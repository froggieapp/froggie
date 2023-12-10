export interface GetChannelAPIResult {
  id: number;
  user_id: number;
  slug: string;
  is_banned: boolean;
  playback_url: string;
  vod_enabled: boolean;
  subscription_enabled: boolean;
  followers_count: number;
  subscriber_badges: unknown[];
  banner_image: BannerImage;
  livestream: Livestream;
  role: unknown;
  muted: boolean;
  follower_badges: unknown[];
  offline_banner_image: OfflineBannerImage;
  verified: boolean;
  recent_categories: RecentCategory[];
  can_host: boolean;
  user: User;
  chatroom: Chatroom;
}

interface BannerImage {
  url: string;
}

interface Livestream {
  id: number;
  slug: string;
  channel_id: number;
  created_at: string;
  session_title: string;
  is_live: boolean;
  risk_level_id: unknown;
  start_time: string;
  source: unknown;
  twitch_channel: unknown;
  duration: number;
  language: string;
  is_mature: boolean;
  viewer_count: number;
  thumbnail: Thumbnail;
  categories: Category[];
  tags: unknown[];
}

interface Thumbnail {
  url: string;
}

interface Category {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  tags: string[];
  description: unknown;
  deleted_at: unknown;
  viewers: number;
  category: Category2;
}

interface Category2 {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

interface OfflineBannerImage {
  src: string;
  srcset: string;
}

interface RecentCategory {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  tags: string[];
  description: unknown;
  deleted_at: unknown;
  viewers: number;
  banner: Banner;
  category: Category3;
}

interface Banner {
  responsive: string;
  url: string;
}

interface Category3 {
  id: number;
  name: string;
  slug: string;
  icon: string;
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

interface Chatroom {
  id: number;
  chatable_type: string;
  channel_id: number;
  created_at: string;
  updated_at: string;
  chat_mode_old: string;
  chat_mode: string;
  slow_mode: boolean;
  chatable_id: number;
  followers_mode: boolean;
  subscribers_mode: boolean;
  emotes_mode: boolean;
  message_interval: number;
  following_min_duration: number;
}
