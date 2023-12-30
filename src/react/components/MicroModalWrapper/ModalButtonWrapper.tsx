import { ComponentChildren, h } from "preact";

interface ModalButtonWrapperProps {
  children: ComponentChildren;
}

export const ModalButtonWrapper = ({ children }: ModalButtonWrapperProps) => {
  return <div className="fgr-GlobalModal-buttonWrapper">{children}</div>;
};
