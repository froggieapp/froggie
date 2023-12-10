import { EmoteProps } from "@/react/util/emotes";
import React from "react";
import { DefaultEmote } from "../DefaultEmote";

export const KickEmote: React.FC<EmoteProps> = ({ id, name }) => {
  const emoteSrc = `https://files.kick.com/emotes/${id}/fullsize`;
  return <DefaultEmote src={emoteSrc} name={name} />;
};
