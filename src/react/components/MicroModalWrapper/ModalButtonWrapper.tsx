import { ComponentChildren } from "preact";
import React from "react";

interface ModalButtonWrapperProps {
  children: ComponentChildren;
}

export const ModalButtonWrapper = ({ children }: ModalButtonWrapperProps) => {
  return <div className="modal-button-wrapper">{children}</div>;
};
