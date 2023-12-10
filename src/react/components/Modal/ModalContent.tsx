import { FloatingFocusManager, FloatingOverlay, FloatingPortal } from "@floating-ui/react";
import React from "react";
import { useModalContext } from "./ModalContext";

interface ModalContentProps {
  children: React.ReactNode;
}

export const ModalContent: React.FC<ModalContentProps> = ({ children }) => {
  const {
    isOpen,
    context,
    headingId,
    descriptionId,
    title,
    description,
    interactions: { getFloatingProps },
    setFloating,
  } = useModalContext();

  if (!isOpen) return null;

  return (
    <FloatingPortal>
      <FloatingOverlay className="modal-overlay" lockScroll>
        <FloatingFocusManager context={context}>
          <div
            className="global-modal"
            aria-labelledby={headingId}
            aria-describedby={descriptionId}
            ref={setFloating}
            {...getFloatingProps()}
          >
            <p className="global-modal-title" id={headingId}>
              {title}
            </p>
            <p className="global-modal-description" id={descriptionId}>
              {description}
            </p>
            <div className="global-modal-content">{children}</div>
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
};
