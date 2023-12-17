import { VNode } from "preact";
import { createPortal } from "preact/compat";

interface PortalProps {
  el: HTMLElement | null | undefined;
  children: VNode;
}

export const Portal = ({ el, children }: PortalProps) => {
  if (!children || !el) return null;

  return createPortal(children, el);
};
