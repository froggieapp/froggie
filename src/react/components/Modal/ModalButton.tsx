import React from "react";
import { useModalContext } from "./ModalContext";
import { useMergeRefs } from "@floating-ui/react";

interface ModalButtonProps {
  children: NonNullable<React.ReactNode> & { ref?: React.Ref<unknown> };
}

export const ModalButton: React.FC<ModalButtonProps> = ({ children }) => {
  const {
    interactions: { getReferenceProps },
    setReference,
    context,
  } = useModalContext();
  const ref = useMergeRefs([setReference, children.ref]);
  return React.isValidElement(children)
    ? React.cloneElement(children, {
        ...getReferenceProps({
          ref,
          "data-state": context.open ? "open" : "closed",
        } as React.HTMLProps<Element>),
      })
    : null;
};
