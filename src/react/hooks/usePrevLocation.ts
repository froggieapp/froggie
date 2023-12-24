import { useEffect, useRef, useState } from "preact/hooks";
import { useLocation } from "wouter-preact";

export const usePrevLocation = () => {
  const [location] = useLocation();
  const [prevLocation, setPrevLocation] = useState<string | null>(null);
  const lastSavedLocation = useRef<string | null>(null);

  useEffect(() => {
    setPrevLocation(lastSavedLocation.current);
    lastSavedLocation.current = location;
  }, [location]);

  return prevLocation;
};
