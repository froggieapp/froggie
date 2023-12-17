import { ComponentChildren } from "preact";
import React from "react";
import MicroModal from "micromodal";
import "./index.css";

interface MicroModalWrapperProps {
  children: ComponentChildren;
  title: string;
  description: string;
  id: string;
}

export const onClose = (id: string) => MicroModal.close(`modal-${id}`);
export const onOpen = (id: string) => MicroModal.show(`modal-${id}`);

export const MicroModalWrapper = ({ id, children, title, description }: MicroModalWrapperProps) => {
  return (
    <div className="global-modal-wrapper" id={`modal-${id}`} aria-hidden="true">
      <div className="modal-overlay" tabIndex={-1} data-micromodal-close>
        <div
          role="dialog"
          aria-modal="true"
          className="global-modal"
          aria-labelledby={`modal-${id}-title`}
          aria-describedby={`modal-${id}-description`}
        >
          <header>
            <h2 className="global-modal-title" id={`modal-${id}-title`}>
              {title}
            </h2>
            <p className="global-modal-description" id={`modal-${id}-description`}>
              {description}
            </p>
            <button aria-label="Close modal" data-micromodal-close></button>
          </header>
          <div className="global-modal-content" id={`modal-${id}-content`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
