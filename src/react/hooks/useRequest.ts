import { useState } from "preact/hooks";

export const useRequest = (fn: () => Promise<void> | void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const call = async () => {
    try {
      setIsLoading(true);
      setError("");
      await fn();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    call,
  };
};
