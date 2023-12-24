import { ComponentChildren, h } from "preact";

interface ModalButtonWrapperProps {
  children: ComponentChildren;
}

export const ModalButtonWrapper = ({ children }: ModalButtonWrapperProps) => {
  return <div className="modal-button-wrapper">{children}</div>;
};
