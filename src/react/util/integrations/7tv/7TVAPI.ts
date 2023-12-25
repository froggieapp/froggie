const fetchEndpoint = async (endpoint: string) => {
  const response = await fetch(`https://7tv.io/v3/${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const get7TVEmotes = async (user: string, platform: string) => {
  const result = await fetchEndpoint(`users/${platform}/${user}`);
  return result?.emote_set?.emotes || [];
};
