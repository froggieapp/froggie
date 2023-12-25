import { h } from "preact";
import { useStore } from "../store/Store";
import { EmojiPickerCategories } from "../components/EmotePicker/EmojiPickerComponent";
import { IconNumber7, IconWorld } from "@tabler/icons-react";
import { useMemo } from "preact/hooks";
import { useChannelContext } from "../util/ChannelContext";

const getIcon = (name: string) => {
  if (name === "Global") return <IconWorld />;
  if (name === "7TV") return <IconNumber7 />;
  return undefined;
};

export const useCategories = () => {
  const { channelName } = useChannelContext();
  const emotes = useStore((state) => state.emotes) || [];
  return useMemo(() => {
    const vals = Object.values(emotes || {});
    const data: EmojiPickerCategories = [];
    for (let i = 0; i < vals.length; i += 1) {
      const emoteCategory = vals[i];
      if (emoteCategory) {
        data.push({
          id: emoteCategory.id,
          src: emoteCategory.src,
          svg: getIcon(emoteCategory.name),
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
    return data as EmojiPickerCategories;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emotes, channelName]);
};
