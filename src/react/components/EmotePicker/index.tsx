import { h } from "preact";
// todo: get rid of emoji-mart/data
// todo: use something like https://gist.github.com/oliveratgithub/0bf11a9aff0d6da7b46f1490f86a71eb
import data, { EmojiMartData } from "@emoji-mart/data";
import { useCategories } from "@/react/hooks/useCategories";
import { EmojiPickerComponent } from "./EmojiPickerComponent";
import { Emoji } from "../EmotePickerList";
import { useClickOutside } from "@/react/hooks/useClickOutside";
import { useRef } from "preact/hooks";

export type CustomCategories = Record<
  string,
  {
    svg?: string;
    src?: string;
  }
>;

interface EmotePickerProps {
  show: boolean;
  onAddEmote: (data: Emoji) => void;
  onClickOutside: () => void;
}

export const EmotePicker = ({ show, onAddEmote, onClickOutside }: EmotePickerProps) => {
  const categories = useCategories();
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClickOutside);
  if (!show) return null;
  return (
    <EmojiPickerComponent
      wrapperRef={ref}
      emojiWidth={30}
      onClickEmote={onAddEmote}
      categories={categories}
      data={data as EmojiMartData}
    />
  );
};
