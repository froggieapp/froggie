import React from "react";

interface ModalButtonWrapperProps {
  children: React.ReactNode;
}

export const ModalButtonWrapper: React.FC<ModalButtonWrapperProps> = ({ children }) => {
  return <div className="modal-button-wrapper">{children}</div>;
};
