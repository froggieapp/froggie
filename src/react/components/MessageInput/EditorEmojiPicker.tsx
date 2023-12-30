import { useCallback, useState } from "preact/hooks";
import { Emoji } from "../EmotePickerList";
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
      <div className="fgr-MessageInput-options">
        <button className="fgr-MessageInput-optionsButton" onClick={onToggleEmojiPicker} type="button">
          <FaceSmileIcon className="fgr-MessageInput-inputSmileIcon" data-open={showEmojiPicker || undefined} />
        </button>
      </div>
      <EmotePicker onClickOutside={onClickOutsideEmojiPicker} onAddEmote={onAddEmote} show={showEmojiPicker} />
    </>
  );
};
