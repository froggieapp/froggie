import { RefObject } from "preact";
import { useEffect, useRef } from "preact/hooks";

export const useClickOutside = <T extends HTMLElement>(ref: RefObject<T>, onClickOutside: () => void) => {
  const onClickOutsideRef = useRef(onClickOutside);

  useEffect(() => {
    onClickOutsideRef.current = onClickOutside;
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && e.target && !ref.current.contains(e.target as Node)) {
        e.stopPropagation();
        e.preventDefault();
        onClickOutsideRef.current();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref, onClickOutsideRef]);
};