import React, { ElementType } from "react";
import {
  FloatingPortal,
  Placement,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import "./index.css";

type ValidTag = keyof JSX.IntrinsicElements;

type TooltipProps<T extends ValidTag> = {
  label: React.ReactNode;
  children?: React.ReactNode;
  position: Placement;
  tag?: T;
  tooltipClassname?: string;
} & JSX.IntrinsicElements[T];

export const Tooltip = <T extends ValidTag>({
  label,
  position,
  children = null,
  tag = "div" as T,
  tooltipClassname = "",
  ...props
}: TooltipProps<T>) => {
  const Tag: ElementType = tag as ElementType;
  const [isOpen, setOpen] = React.useState(false);

  const { context, refs, floatingStyles } = useFloating({
    placement: position,
    open: isOpen,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        crossAxis: position.includes("-"),
        fallbackAxisSideDirection: "start",
        padding: 5,
      }),
      shift({ padding: 5 }),
    ],
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  return (
    <>
      <Tag {...props} ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </Tag>
      <FloatingPortal>
        {isOpen && (
          <div
            className={`global-tooltip ${tooltipClassname}`}
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {label}
          </div>
        )}
      </FloatingPortal>
    </>
  );
};
