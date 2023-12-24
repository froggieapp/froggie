import { EmojiMartData } from "@emoji-mart/data";
import "./index.css";
import { h, RefObject, VNode } from "preact";
import { useDraggable } from "react-use-draggable-scroll";
import { dataMartCategoriesToEmojiPickerCategories } from "./util";
import { EmojiPickerContextValue, EmojiPickerProvider } from "./EmojiPickerContext";
import { Emoji, EmojiPickerList } from "./EmojiPickerList";
import { useEffect, useMemo, useRef } from "preact/hooks";

export type EmojiPickerCategories = {
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
  useEffect(() => {
    memoizedClickEmoteCb.current = onClickEmote;
  });
  const draggableCategoriesRef = useRef<HTMLDivElement>(null);
  const { events } = useDraggable(draggableCategoriesRef as React.MutableRefObject<HTMLElement>, {
    applyRubberBandEffect: true,
  });
  const allEmojiPickerCategories: EmojiPickerCategories = useMemo(() => {
    return [...categories, ...dataMartCategoriesToEmojiPickerCategories(data)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  const emojiPickerCtxValue: EmojiPickerContextValue = useMemo(
    () => ({
      onClickEmote: memoizedClickEmoteCb.current,
    }),
    [],
  );

  return (
    <EmojiPickerProvider value={emojiPickerCtxValue}>
      <div ref={wrapperRef} className="emoji-picker-root">
        <div className="emoji-picker-categories" {...events} ref={draggableCategoriesRef}>
          {allEmojiPickerCategories.map((c) => (
            <button data-emoji-picker-category={c.name} key={c.name} type="button">
              {c.src ? <img src={c.src} /> : c.svg}
            </button>
          ))}
        </div>
        <div className="emoji-picker-content">
          <input placeholder="Search emote" type="text" className="emoji-picker-search" />
          <EmojiPickerList emojiWidth={emojiWidth} categories={allEmojiPickerCategories} />
        </div>
      </div>
    </EmojiPickerProvider>
  );
};
