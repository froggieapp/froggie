export interface UserAPIResult {
  id: number;
  email: string;
  username: string;
  google_id: string;
  agreed_to_terms: boolean;
  email_verified_at: string;
  bio: null | undefined | string;
  country: null | undefined | string;
  state: null | undefined | string;
  city: null | undefined | string;
  enable_live_notifications: boolean;
  instagram: null | undefined | string;
  twitter: null | undefined | string;
  youtube: null | undefined | string;
  discord: null | undefined | string;
  tiktok: null | undefined | string;
  facebook: null | undefined | string;
  enable_onscreen_live_notifications: boolean;
  apple_id: null | undefined | string;
  phone: null | undefined | string;
  email_updated_at: string;
  newsletter_subscribed: boolean;
  enable_sms_promo: boolean;
  enable_sms_security: boolean;
  profilepic: null | undefined | string;
  // filtered_categories: string[]
  is_2fa_setup: boolean;
  redirect: null | undefined | string;
  channel_can_be_updated: boolean;
  is_live: boolean;
  is_over_18: boolean;
  intercom_hash: null | undefined | string;
  // roles: any[]
  streamer_channel: StreamerChannel;
}

export interface StreamerChannel {
  id: number;
  user_id: number;
  slug: string;
  is_banned: boolean;
  playback_url: null | undefined | string;
  name_updated_at: null | undefined | number;
  vod_enabled: boolean;
  subscription_enabled: boolean;
  can_host: boolean;
}
