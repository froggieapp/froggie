import React from "react";
import { useLocation } from "wouter-preact";

export const usePrevLocation = () => {
  const [location] = useLocation();
  const [prevLocation, setPrevLocation] = React.useState<string | null>(null);
  const lastSavedLocation = React.useRef<string | null>(null);

  React.useEffect(() => {
    setPrevLocation(lastSavedLocation.current);
    lastSavedLocation.current = location;
  }, [location]);

  return prevLocation;
};
