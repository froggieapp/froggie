import { h } from "preact";
import { EmojiPickerCategories } from "../EmotePicker/EmojiPickerComponent";
import { useEmojiPickerContext } from "../EmotePicker/EmojiPickerContext";
import { svgEmoji } from "@/react/util/emotes";
import { splitArrayInChunks } from "@/react/util/util";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "preact/hooks";
import { IconLock } from "@tabler/icons-react";
import "./index.css";
import { GLOBAL_TOOLTIP } from "@/react/util/tooltips";
import { Virtuoso } from "react-virtuoso";

interface EmojiPickerListProps {
  categories: EmojiPickerCategories;
  emojiWidth: number;
  gapX?: number;
  gapY?: 2;
}

export interface Emoji {
  name: string;
  id: string;
  isLocked: boolean;
  aliases: string[];
  skins: {
    src?: string;
    value: string;
    text?: string;
  }[];
}

export const EmojiPickerList = ({ categories, emojiWidth, gapX = 2, gapY = 2 }: EmojiPickerListProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const activeStickyIndexRef = useRef<{
    idx: number;
    name: string;
  } | null>(null);
  const [columnCount, setColumnCount] = useState(1);

  useLayoutEffect(() => {
    setColumnCount(
      Math.floor(
        (parentRef.current ? Number(window.getComputedStyle(parentRef.current).width.replace("px", "")) : 1) /
          (emojiWidth + gapX * 2),
      ) || 1,
    );
  }, [emojiWidth, gapX]);

  const rows = useMemo(
    () => categories.flatMap((c) => [c.name, ...splitArrayInChunks(c.emojis, columnCount)]),
    [categories, columnCount],
  );
  const stickyIndexes = useMemo(() => {
    const stickyIndexes = [
      {
        name: categories?.[0]?.name,
        idx: 0,
      },
    ];
    let totalIndexes = 1;
    for (let i = 0; i < categories.length; i += 1) {
      const rowCount = Math.ceil(categories[i].emojis.length / columnCount);
      stickyIndexes.push({
        idx: totalIndexes + rowCount,
        name: categories[i].name,
      });
      totalIndexes += rowCount + 1;
    }
    return stickyIndexes;
  }, [categories, columnCount]);
  const isActiveSticky = (index: number) => activeStickyIndexRef.current?.idx === index;

  // const items = virtualizer.getVirtualItems();
  const { onClickEmote } = useEmojiPickerContext();
  const handleEmoteClick = useCallback((emote: Emoji) => () => onClickEmote(emote), [onClickEmote]);

  const onChangeRange = ({ startIndex }: { startIndex: number; endIndex: number }) => {
    activeStickyIndexRef.current = [...stickyIndexes].reverse().find((c) => startIndex >= c.idx) || null;

    if (!activeStickyIndexRef.current) return;

    const headerElement = document.querySelector(
      `[data-emoji-picker-category='${activeStickyIndexRef.current.name}']`,
    ) as HTMLElement | null;
    if (headerElement) headerElement.dataset.isActive = "true";

    if (activeStickyIndexRef.current.name) {
      for (let i = 0; i < stickyIndexes.length; i += 1) {
        if (stickyIndexes[i]?.name !== activeStickyIndexRef.current.name) {
          const inactiveHeaderElement = document.querySelector(
            `[data-emoji-picker-category='${stickyIndexes[i].name}']`,
          ) as HTMLElement | null;

          if (inactiveHeaderElement) inactiveHeaderElement.dataset.isActive = undefined;
        }
      }
    }
  };

  return (
    <div className="fgr-EmotePickerList" ref={parentRef}>
      <Virtuoso
        totalCount={rows.length}
        rangeChanged={onChangeRange}
        fixedItemHeight={emojiWidth + gapY * 2}
        itemContent={(index) => {
          const row = rows[index];
          if (typeof row === "string") {
            const isActiveStickyVal = isActiveSticky(index);
            return (
              <div
                key={index}
                className="fgr-EmotePickerList-categoryName"
                data-is-active-sticky={isActiveStickyVal}
                data-category-value={row}
                data-sticky-category-index={index}
                style={{
                  width: "100%",
                }}
              >
                {row}
              </div>
            );
          }

          return (
            <div
              key={index}
              style={{
                padding: `${gapY}px 0`,
              }}
              className="fgr-EmotePickerList-content"
            >
              {row.map((emoji) => (
                <button
                  key={`${emoji.id}${index}`}
                  type="button"
                  style={{
                    height: `${emojiWidth - gapY}px`,
                    width: `${emojiWidth - gapX}px`,
                    padding: `0 ${gapX}px`,
                  }}
                  onClick={handleEmoteClick(emoji)}
                  className="fgr-EmotePickerList-emoteContent"
                  data-tooltip-id={GLOBAL_TOOLTIP}
                  data-tooltip-content={emoji.name}
                  data-tooltip-place="top"
                >
                  {emoji.skins[0].src ? (
                    <img loading="lazy" src={emoji.skins[0].src} />
                  ) : (
                    svgEmoji(emoji.skins[0].text || "", "fgr-EmotePickerList-emoteContentIcon")
                  )}
                  {emoji.isLocked ? (
                    <span
                      aria-label="Subscribers only"
                      className="fgr-EmotePickerList-emoteContentLockedOverlay u-overlay"
                    >
                      <IconLock className="fgr-EmotePickerList-lockedIcon" />
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          );
        }}
      />
    </div>
  );
};
