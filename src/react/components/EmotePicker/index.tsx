import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { pickeri18n } from "./util";

export interface EmojiData {
  id: string;
  name: string;
  native: string;
  shortcodes: string;
}

interface EmotePickerProps {
  show: boolean;
  onAddEmote: (data: EmojiData) => void;
  onClickOutside: () => void;
}

export const EmotePicker = ({ show, onAddEmote, onClickOutside }: EmotePickerProps) => {
  if (!show) return null;
  return (
    <div>
      <Picker onClickOutside={onClickOutside} i18n={pickeri18n} data={data} onEmojiSelect={onAddEmote} />
    </div>
  );
};
