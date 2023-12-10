import React from "react";

export const useRequest = (fn: () => Promise<void> | void) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

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
