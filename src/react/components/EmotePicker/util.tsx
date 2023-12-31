import { EmojiMartData } from "@emoji-mart/data";
import {
  IconBox,
  IconBuildingCommunity,
  IconFlag,
  IconMeat,
  IconMoodSmileFilled,
  IconRadioactive,
  IconSwimming,
  IconTrees,
} from "@tabler/icons-react";
import { h } from "preact";
import { EmojiPickerCategories } from "./EmojiPickerComponent";

const emojiMartIcons = {
  people: <IconMoodSmileFilled />,
  nature: <IconTrees />,
  foods: <IconMeat />,
  activity: <IconSwimming />,
  places: <IconBuildingCommunity />,
  objects: <IconBox />,
  symbols: <IconRadioactive />,
  flags: <IconFlag />,
};

export const getEmojiMartCategoryIcon = (id: string) => {
  const Icon = emojiMartIcons[id as keyof typeof emojiMartIcons];
  if (!Icon) {
    console.error("Missing icon for", id);
    return null;
  }
  return Icon;
};

// todo: do this on vite build time
export const dataMartCategoriesToEmojiPickerCategories = (data: EmojiMartData) => {
  return data.categories.map((emojiMartCategory) => ({
    svg: getEmojiMartCategoryIcon(emojiMartCategory.id),
    name: emojiMartCategory.id,
    id: emojiMartCategory.id,
    emojis: emojiMartCategory.emojis.map((e) => {
      const emoji = data.emojis[e];
      return {
        id: emoji.id,
        name: emoji.name,
        isLocked: false,
        skins: emoji.skins.map((skin) => ({
          text: skin.native,
          value: skin.native,
        })),
        aliases: emoji.keywords,
      };
    }),
  }));
};

export const fillterEmoteCategories = (search: string, categories: EmojiPickerCategories) => {
  if (!search) return categories;
  const lowerCaseSearch = search.toLowerCase();
  return categories.map((c) => ({
    ...c,
    emojis: c.emojis.filter(
      (e) =>
        e.name.toLowerCase().includes(lowerCaseSearch) ||
        e.aliases.some((a) => a.toLowerCase().includes(lowerCaseSearch)),
    ),
  }));
};
