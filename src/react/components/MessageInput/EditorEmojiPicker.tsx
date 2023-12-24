import { useCallback, useState } from "preact/hooks";
import { Emoji } from "../EmotePicker/EmojiPickerList";
import { EmotePicker } from "../EmotePicker";
import { FaceSmileIcon } from "@heroicons/react/20/solid";
import { RefObject, h } from "preact";
import { EmotePluginRef } from "./EmotePlugin";

interface EditorEmojiPickerProps {
  emotePluginRef: RefObject<EmotePluginRef | null>;
}

export const EditorEmojiPicker = ({ emotePluginRef }: EditorEmojiPickerProps) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const onAddEmote = useCallback(
    (data: Emoji) => {
      if (data.isLocked || (!data.skins?.[0]?.src && !data.skins?.[0]?.text)) return;
      emotePluginRef.current?.addEmote?.(data.name, data.skins[0].src, data.skins[0].text, data.skins[0].value);
    },
    [emotePluginRef],
  );
  const onToggleEmojiPicker = () => setShowEmojiPicker((s) => !s);
  const onClickOutsideEmojiPicker = useCallback(() => {
    if (showEmojiPicker) setShowEmojiPicker(false);
  }, [showEmojiPicker]);

  return (
    <>
      <div className="message-input-options">
        <button onClick={onToggleEmojiPicker} type="button">
          <FaceSmileIcon className="input-smile-icon" data-open={showEmojiPicker || undefined} />
        </button>
      </div>
      <div className="emote-picker-wrapper">
        <EmotePicker onClickOutside={onClickOutsideEmojiPicker} onAddEmote={onAddEmote} show={showEmojiPicker} />
      </div>
    </>
  );
};
