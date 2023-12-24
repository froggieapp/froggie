import { h } from "preact";
import { EmojiPickerCategories } from "./EmojiPickerComponent";
import { Range, defaultRangeExtractor, useVirtualizer } from "@tanstack/react-virtual";
import { useEmojiPickerContext } from "./EmojiPickerContext";
import { svgEmoji } from "@/react/util/emotes";
import { splitArrayInChunks } from "@/react/util/util";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "preact/hooks";
import { IconLock } from "@tabler/icons-react";

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
  const activeStickyIndexRef = useRef<number>(0);
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
    const stickyIndexes = [0];
    let totalIndexes = 1;
    for (let i = 0; i < categories.length; i += 1) {
      const rowCount = Math.ceil(categories[i].emojis.length / columnCount);
      stickyIndexes.push(totalIndexes + rowCount);
      totalIndexes += rowCount + 1;
    }
    return stickyIndexes;
  }, [categories, columnCount]);
  const isActiveSticky = (index: number) => activeStickyIndexRef.current === index;

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => emojiWidth + gapY * 2,
    overscan: 2,
    rangeExtractor: useCallback(
      (range: Range) => {
        activeStickyIndexRef.current = [...stickyIndexes].reverse().find((index) => range.startIndex >= index) || 0;

        const element = document.querySelector(`[data-sticky-category-index='${activeStickyIndexRef.current}']`);

        const categoryName = element?.getAttribute("data-category-value");
        const headerElement = document.querySelector(
          `[data-emoji-picker-category='${categoryName}']`,
        ) as HTMLElement | null;
        if (headerElement) headerElement.dataset.isActive = "true";

        for (let i = 0; i < stickyIndexes.length; i += 1) {
          if (stickyIndexes[i] !== activeStickyIndexRef.current) {
            const stickyElement = document.querySelector(`[data-sticky-category-index='${stickyIndexes[i]}']`);
            const stickyCategoryName = stickyElement?.getAttribute("data-category-value");
            const inactiveHeaderElement = document.querySelector(
              `[data-emoji-picker-category='${stickyCategoryName}']`,
            ) as HTMLElement | null;
            if (inactiveHeaderElement) inactiveHeaderElement.dataset.isActive = undefined;
          }
        }

        const next = new Set([activeStickyIndexRef.current, ...defaultRangeExtractor(range)]);

        return [...next].sort((a, b) => a - b);
      },
      [stickyIndexes],
    ),
  });

  const categoriesToObserveRef = useRef<(HTMLParagraphElement | null)[]>([]);
  useEffect(() => {
    categoriesToObserveRef.current = categoriesToObserveRef.current.slice(0, rows.length);
  }, [rows.length]);

  const items = virtualizer.getVirtualItems();
  const { onClickEmote } = useEmojiPickerContext();
  const handleEmoteClick = useCallback((emote: Emoji) => () => onClickEmote(emote), [onClickEmote]);
  return (
    <div ref={parentRef} className="emoji-picker-emote-list">
      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: "100%",
          position: "relative",
        }}
      >
        {items.map((virtualRow) => {
          const row = rows[virtualRow.index];
          if (typeof row === "string") {
            const isActiveStickyVal = isActiveSticky(virtualRow.index);
            return (
              <div
                key={virtualRow.key}
                className="emoji-picker-category-name"
                data-is-active-sticky={isActiveStickyVal}
                data-category-value={row}
                data-sticky-category-index={virtualRow.index}
                ref={(el) => (categoriesToObserveRef.current[virtualRow.index] = el)}
                style={{
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  ...(!isActiveStickyVal
                    ? {
                        position: "absolute",
                        transform: `translateY(${virtualRow.start}px)`,
                      }
                    : {
                        position: "sticky",
                      }),
                }}
              >
                {row}
              </div>
            );
          }

          return (
            <div
              key={virtualRow.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
                display: "flex",
                padding: `${gapY}px 0`,
              }}
              className="emoji-list"
            >
              {row.map((emoji) => (
                <button
                  key={emoji.id}
                  type="button"
                  style={{
                    height: `${virtualRow.size - gapY}px`,
                    width: `${virtualRow.size - gapX}px`,
                    padding: `0 ${gapX}px`,
                  }}
                  onClick={handleEmoteClick(emoji)}
                  className="emote-content"
                >
                  {emoji.skins[0].src ? (
                    <img loading="lazy" src={emoji.skins[0].src} />
                  ) : (
                    svgEmoji(emoji.skins[0].text || "")
                  )}
                  {emoji.isLocked ? (
                    <span aria-label="Subscribers only" className="emote-content-locked-overlay">
                      <IconLock />
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
