import { EmoteProps, GET_KICK_EMOTE_SRC } from "@/react/util/emotes";
import { h } from "preact";
import { DefaultEmote } from "../DefaultEmote";

export const KickEmote: React.FC<EmoteProps> = ({ id, name }) => {
  const emoteSrc = GET_KICK_EMOTE_SRC(id);
  return <DefaultEmote src={emoteSrc} name={name} />;
};
