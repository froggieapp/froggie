import { FloatingContext, ReferenceType, useInteractions } from "@floating-ui/react";
import React from "react";

export interface ModalContextValue {
  title: string;
  description: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  headingId: string;
  descriptionId: string;
  interactions: ReturnType<typeof useInteractions>;
  context: FloatingContext;
  setReference: (node: ReferenceType | null) => void;
  setFloating: (node: HTMLElement | null) => void;
}

const ModalContext = React.createContext<ModalContextValue | null>(null);
export const ModalContextProvider = ModalContext.Provider;
export const useModalContext = () => {
  const useModal = React.useContext(ModalContext);
  if (!useModal) throw new Error("Wrap the modal components with a ModalContextProvider");
  return useModal;
};
