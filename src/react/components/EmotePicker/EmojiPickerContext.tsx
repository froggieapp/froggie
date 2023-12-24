import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { Emoji } from "./EmojiPickerList";

export interface EmojiPickerContextValue {
  onClickEmote: (emote: Emoji) => void;
}

const EmojiPickerContext = createContext<EmojiPickerContextValue>({
  onClickEmote: () => {},
});

export const useEmojiPickerContext = () => {
  return useContext(EmojiPickerContext);
};

export const EmojiPickerProvider = EmojiPickerContext.Provider;
