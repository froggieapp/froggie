import { h } from "preact";
import { useStore } from "../store/Store";
import { EmojiPickerCategories } from "../components/EmotePicker/EmojiPickerComponent";
import { IconWorldLongitude } from "@tabler/icons-react";
import { useMemo } from "preact/hooks";

export const useCategories = () => {
  const emotes = useStore((state) => state.emotes) || {};
  const categories = Object.keys(emotes).join("");
  return useMemo(() => {
    const vals = Object.values(emotes || {});
    const data: EmojiPickerCategories = [];
    for (let i = 0; i < vals.length; i += 1) {
      const emoteCategory = vals[i];
      if (emoteCategory && emoteCategory.name !== "kick-global") {
        data.push({
          src: emoteCategory.src,
          name: emoteCategory.name,
          emojis: emoteCategory.emotes.map((e) => ({
            id: e.id,
            name: e.name,
            isLocked: e.isLocked,
            aliases: [e.name, e.id],
            skins: [{ src: e.src, value: e.value }],
          })),
        });
      }
    }
    return [
      {
        svg: <IconWorldLongitude />,
        name: "Global",
        emojis:
          emotes["kick-global"]?.emotes.map((e) => ({
            id: e.id,
            name: e.name,
            isLocked: false,
            aliases: [e.name, e.id],
            skins: [{ src: e.src, value: e.value }],
          })) || [],
      },
      ...data,
    ] as EmojiPickerCategories;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);
};
