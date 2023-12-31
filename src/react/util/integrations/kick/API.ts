import { SendMessageAPIResult } from "../../../types/SendMessage";
import { API_URL, API_URL_V1, NO_API_ENDPOINT } from "../../constants";
import { GetChannelAPIResult } from "src/types/GetChannel";
import { getAPIErrorForKick, getCookie } from "../../util";
import { UserAPIResult } from "../../../types/UserResult";
import { GetKickEmotes } from "../../../types/GetKickEmotes";
import { GetUserRelationToCurrentChannelResult } from "../../../types/GetUserRelationToCurrentChannel";
import { GetUserRelationToChannelResult } from "@/react/types/GetUserRelationToChannel";

const getHeaders = (shouldThrow?: boolean) => {
  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const tokenValue = getCookie("XSRF-TOKEN");
  if (tokenValue) {
    const decodedToken = decodeURIComponent(tokenValue);
    headers["X-Xsrf-Token"] = decodedToken;
    headers["Authorization"] = `Bearer ${decodedToken}`;
  } else if (shouldThrow) {
    throw new Error("Not authed. Click on the options icon on top left and add the token.");
  }
  return headers;
};

const fetchEndpoint = async (endpoint: string, init?: RequestInit | undefined, version?: "1" | "2" | "none") => {
  let v = `${NO_API_ENDPOINT}/`;
  if (version === "1") {
    v = `${API_URL_V1}/`;
  } else if (version === "2") {
    v = `${API_URL}/`;
  }
  const response = await fetch(`${v}${endpoint}`, init);

  if (response.status === 429)
    throw new Error(await getAPIErrorForKick(response, "You sent too many requests. Kick is rate-limiting us."));
  if (response.status === 404) throw new Error(await getAPIErrorForKick(response, "Not found"));
  if (response.status === 403)
    throw new Error(
      await getAPIErrorForKick(response, "Not authed. Click on the options icon on top left and add the token."),
    );
  const data = await response.json();
  return data;
};

export const getChannelInfo = (channelName: string) => {
  return fetchEndpoint(`channels/${channelName}`, undefined, "2") as Promise<GetChannelAPIResult | undefined | null>;
};

export const getUserCurrentRelationToChannel = (channelName: string) => {
  return fetchEndpoint(
    `channels/${channelName}/me`,
    {
      method: "GET",
      credentials: "include",
      headers: getHeaders(),
    },
    "2",
  ) as Promise<GetUserRelationToCurrentChannelResult | undefined | null>;
};

export const getKickUserCard = async (channelName: string, user: string) => {
  const data = (await fetchEndpoint(`channels/${channelName}/users/${encodeURI(user)}`, undefined, "2")) as
    | GetUserRelationToChannelResult
    | undefined
    | null;
  return data;
};

export const getEmotes = (channelName: string) => {
  return fetchEndpoint(
    `emotes/${channelName}`,
    {
      credentials: "include",
      method: "GET",
      headers: getHeaders(),
    },
    "none",
  ) as Promise<GetKickEmotes | undefined | null>;
};

export const sendMessage = (channelName: string, content: string) => {
  return fetchEndpoint(
    `messages/send/${channelName}`,
    {
      credentials: "include",
      body: JSON.stringify({
        content,
        type: "message",
      }),
      method: "POST",
      headers: getHeaders(true),
    },
    "2",
  ) as Promise<SendMessageAPIResult | undefined | null>;
};

export const getUser = () => {
  return fetchEndpoint(
    "user",
    {
      credentials: "include",
      headers: getHeaders(),
    },
    "1",
  ) as Promise<UserAPIResult | undefined | null>;
};

export const banUser = (channel: string, username: string, duration: number, permanent: boolean) => {
  return fetchEndpoint(
    `channels/${channel}/bans`,
    {
      credentials: "include",
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify({
        banned_username: username,
        duration,
        permanent,
      }),
    },
    "2",
  ) as Promise<UserAPIResult | undefined | null>;
};
