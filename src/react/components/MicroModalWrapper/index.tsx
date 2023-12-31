import { ComponentChildren, h } from "preact";
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
    <div className="fgr-MicroModalWrapper u-overlay" id={`modal-${id}`} aria-hidden="true">
      <div className="fgr-MicroModalWrapper-overlay" tabIndex={-1} data-micromodal-close>
        <div
          role="dialog"
          aria-modal="true"
          className="fgr-MicroModalWrapper-content u-shadowLg"
          aria-labelledby={`modal-${id}-title`}
          aria-describedby={`modal-${id}-description`}
        >
          <header>
            <h2 className="fgr-MicroModalWrapper-title" id={`modal-${id}-title`}>
              {title}
            </h2>
            <p className="fgr-MicroModalWrapper-description" id={`modal-${id}-description`}>
              {description}
            </p>
            <button aria-label="Close modal" data-micromodal-close />
          </header>
          <div className="fgr-MicroModalWrapper-childrenWrapper" id={`modal-${id}-content`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
