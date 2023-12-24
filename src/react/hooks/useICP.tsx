/* eslint-disable @typescript-eslint/no-explicit-any */

import constants from "@shared/constants";
import { useRef, useEffect } from "preact/hooks";
export type VALID_EVENT = keyof typeof constants;

export const useICP = (evt: VALID_EVENT, callback: (...args: unknown[]) => void) => {
  const cbRef = useRef(callback);
  useEffect(() => {
    cbRef.current = callback;
  });
  useEffect(() => {
    window.electronAPI.receive(evt, (...args) => {
      cbRef.current(...args);
    });
    return () => {
      window.electronAPI.removeAllListeners(evt);
    };
  }, [evt]);
};
/* eslint-enable @typescript-eslint/no-var-requires */
