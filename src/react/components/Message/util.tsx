import { VNode, h } from "preact";

export const wrapStringsIntoSpan = (elements: (VNode | string)[], className?: string) => {
  const result: (VNode | string)[] = [];

  for (let i = 0; i < elements.length; i += 1) {
    if (typeof elements[i] === "string") {
      result.push(
        <span key={i} className={className}>
          {elements[i]}
        </span>,
      );
    } else {
      result.push(elements[i]);
    }
  }

  return result;
};
