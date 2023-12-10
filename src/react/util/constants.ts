export const SOCKET_API_URL = "wss://ws-us2.pusher.com/app";
export const SOCKET_API_PARAMS = "protocol=7&client=js&version=7.6.0&flash=false";
export const API_URL = "https://kick.com/api/v2";
export const API_URL_V1 = "https://kick.com/api/v1";
export const PUSHER_APP_KEY = "eb1d5f283081a78b932c";
export const WEB_SOCKET_URL = `${SOCKET_API_URL}/${PUSHER_APP_KEY}?${SOCKET_API_PARAMS}`;
export const KICK_SOCKET_PING_TIMEOUT = 120 * 1000;
export const KICK_MSG_MAX_CHAR = 500;
