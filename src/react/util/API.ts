import { SendMessageAPIResult } from "../types/SendMessage";
import { API_URL, API_URL_V1 } from "./constants";
import { GetChannelAPIResult } from "src/types/GetChannel";
import { getAPIErrorForKick, getCookie } from "./util";
import { UserAPIResult } from "../types/UserResult";

const fetchEndpoint = async (endpoint: string, init?: RequestInit | undefined, useV1?: boolean) => {
  const response = await fetch(`${useV1 ? API_URL_V1 : API_URL}/${endpoint}`, init);
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
  return fetchEndpoint(`channels/${channelName}`) as Promise<GetChannelAPIResult | undefined | null>;
};

export const sendMessage = (channelName: string, content: string) => {
  const tokenValue = getCookie("XSRF-TOKEN");
  if (!tokenValue) throw new Error("Not authed. Click on the options icon on top left and add the token.");

  const decodedToken = decodeURIComponent(tokenValue);
  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Xsrf-Token": decodedToken,
    Authorization: `Bearer ${decodedToken}`,
  };

  return fetchEndpoint(`messages/send/${channelName}`, {
    credentials: "include",
    body: JSON.stringify({
      content,
      type: "message",
    }),
    method: "POST",
    headers,
  }) as Promise<SendMessageAPIResult | undefined | null>;
};

export const getUser = () => {
  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const tokenValue = getCookie("XSRF-TOKEN");
  if (tokenValue) {
    const decodedToken = decodeURIComponent(tokenValue);
    headers["X-Xsrf-Token"] = decodedToken;
    headers["Authorization"] = `Bearer ${decodedToken}`;
  }

  return fetchEndpoint(
    "user",
    {
      credentials: !tokenValue ? "omit" : "include",
      headers,
    },
    true,
  ) as Promise<UserAPIResult | undefined | null>;
};
