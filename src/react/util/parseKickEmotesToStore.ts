import { StoreEmote } from "../store/createEmoteStore";
import { GetKickEmotes } from "../types/GetKickEmotes";
import { GET_KICK_EMOTE_SRC } from "./emotes";

export const parseKickEmotesToStore = (emotes: NonNullable<GetKickEmotes>[number]["emotes"], isSubscribed: boolean) => {
  const parsedEmotes: StoreEmote[] = emotes.map((e) => ({
    id: e.id.toString(),
    name: e.name,
    value: `[emote:${e.id.toString()}:${e.name}]`,
    src: GET_KICK_EMOTE_SRC(e.id.toString()),
    isLocked: !!e.subscribers_only && !isSubscribed,
  }));
  return parsedEmotes;
};
