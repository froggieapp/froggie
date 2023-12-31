import { EmojiMartData } from "@emoji-mart/data";
import "./index.css";
import { h, RefObject, VNode } from "preact";
import { useDraggable } from "react-use-draggable-scroll";
import { dataMartCategoriesToEmojiPickerCategories, fillterEmoteCategories } from "./util";
import { EmojiPickerContextValue, EmojiPickerProvider } from "./EmojiPickerContext";
import { Emoji, EmojiPickerList } from "../EmotePickerList";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { ChangeEvent } from "preact/compat";
import { useCallback } from "react";
import debounce from "debounce";

export type EmojiPickerCategories = {
  id: string;
  src?: string;
  svg?: VNode | null;
  name: string;
  emojis: Emoji[];
}[];

interface EmojiPickerComponentProps {
  data: EmojiMartData;
  categories: EmojiPickerCategories;
  onClickEmote: (emote: Emoji) => void;
  emojiWidth: number;
  wrapperRef: RefObject<HTMLDivElement>;
}

export const EmojiPickerComponent = ({
  wrapperRef,
  data,
  categories,
  onClickEmote,
  emojiWidth,
}: EmojiPickerComponentProps) => {
  const memoizedClickEmoteCb = useRef(onClickEmote);
  const [searchEmote, setSearchEmote] = useState("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChangeSearch = useCallback(
    debounce((e: ChangeEvent) => {
      if (e.target instanceof HTMLInputElement) setSearchEmote(e.target.value);
    }, 50),
    [setSearchEmote],
  );
  useEffect(() => {
    memoizedClickEmoteCb.current = onClickEmote;
  });
  const draggableCategoriesRef = useRef<HTMLDivElement>(null);
  const { events } = useDraggable(draggableCategoriesRef as React.MutableRefObject<HTMLElement>, {
    applyRubberBandEffect: true,
  });
  const allEmojiPickerCategories: EmojiPickerCategories = useMemo(() => {
    return fillterEmoteCategories(searchEmote, [...categories, ...dataMartCategoriesToEmojiPickerCategories(data)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, searchEmote]);

  const emojiPickerCtxValue: EmojiPickerContextValue = useMemo(
    () => ({
      onClickEmote: memoizedClickEmoteCb.current,
    }),
    [],
  );

  return (
    <EmojiPickerProvider value={emojiPickerCtxValue}>
      <div ref={wrapperRef} className="fgr-EmotePicker u-shadowLg">
        <div className="fgr-EmotePicker-emojiPickerCategories" {...events} ref={draggableCategoriesRef}>
          {allEmojiPickerCategories.map((c) => (
            <button data-emoji-picker-category={c.name} key={c.id} type="button">
              {c.src ? <img src={c.src} /> : c.svg}
            </button>
          ))}
        </div>
        <div className="fgr-EmotePicker-emojiPickerContent">
          <input
            onChange={handleChangeSearch}
            placeholder="Search emote"
            type="text"
            className="fgr-EmotePicker-emojiPickerSearch"
          />
          <EmojiPickerList emojiWidth={emojiWidth} categories={allEmojiPickerCategories} />
        </div>
      </div>
    </EmojiPickerProvider>
  );
};
