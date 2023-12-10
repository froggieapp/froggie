/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import constants from "@shared/constants";
export type VALID_EVENT = keyof typeof constants;

export const useICP = (evt: VALID_EVENT, callback: (...args: unknown[]) => void) => {
  const cbRef = React.useRef(callback);
  React.useEffect(() => {
    cbRef.current = callback;
  });
  React.useEffect(() => {
    window.electronAPI.receive(evt, (...args) => {
      cbRef.current(...args);
    });
    return () => {
      window.electronAPI.removeAllListeners(evt);
    };
  }, [evt]);
};
/* eslint-enable @typescript-eslint/no-var-requires */
