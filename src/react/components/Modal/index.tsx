import React, { useId } from "react";
import { useClick, useDismiss, useFloating, useInteractions, useRole } from "@floating-ui/react";
import { ModalContextProvider, ModalContextValue } from "./ModalContext";
import "./index.css";

interface ModalProviderProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

export { ModalButton } from "./ModalButton";
export { ModalContent } from "./ModalContent";
export { ModalButtonWrapper } from "./ModalButtonWrapper";

export const ModalProvider: React.FC<ModalProviderProps> = ({ isOpen, setIsOpen, title, description, children }) => {
  const {
    context,
    refs: { setReference, setFloating },
  } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });
  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });

  const interactions = useInteractions([click, role, dismiss]);

  const headingId = useId();
  const descriptionId = useId();

  const ctxValue: ModalContextValue = React.useMemo(
    () => ({
      interactions,
      headingId,
      descriptionId,
      isOpen,
      setIsOpen,
      title,
      description,
      context,
      setReference,
      setFloating,
    }),
    [interactions, headingId, descriptionId, isOpen, setIsOpen, title, description, context, setReference, setFloating],
  );

  return <ModalContextProvider value={ctxValue}>{children}</ModalContextProvider>;
};
