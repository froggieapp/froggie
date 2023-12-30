import "./index.css";
import { useStore } from "@/react/store/Store";
import { useShallow } from "zustand/react/shallow";
import { h } from "preact";
import { useRef } from "preact/hooks";
import { useClickOutside } from "@/react/hooks/useClickOutside";
import { useChannelContext } from "@/react/util/ChannelContext";

export const UserCard = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { userCard, onClose } = useStore(
    useShallow((state) => ({
      userCard: state.userCard,
      onClose: state.closeUserCardModal,
    })),
  );

  const isOpen = !!userCard;

  useClickOutside(wrapperRef, () => {
    onClose();
  });

  const { UserCardContent } = useChannelContext();

  if (!userCard?.x || !userCard?.y || !isOpen) return null;
  return (
    <div
      ref={wrapperRef}
      className="fgr-UserCardTooltiper"
      style={{
        position: "fixed",
        top: userCard.y,
        left: userCard.x,
        zIndex: 50,
      }}
    >
      <UserCardContent {...userCard.additionalData} />
    </div>
  );
};
