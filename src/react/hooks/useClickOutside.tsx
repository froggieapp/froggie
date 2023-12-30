import { RefObject } from "preact";
import { useEffect, useRef } from "preact/hooks";

export const useClickOutside = <T extends HTMLElement>(ref: RefObject<T>, onClickOutside: (node: Node) => void) => {
  const onClickOutsideRef = useRef(onClickOutside);

  useEffect(() => {
    onClickOutsideRef.current = onClickOutside;
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && e.target && !ref.current.contains(e.target as Node)) {
        e.preventDefault();
        onClickOutsideRef.current(e.target as Node);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref, onClickOutsideRef]);
};
