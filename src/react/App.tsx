import React from "react";
import { Router } from "./Router";
import { Listener } from "./components/Listener";
import { WithSockets } from "./HOCs/WithSockets";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WithSockets>
        <>
          <Listener />
          <Router />
        </>
      </WithSockets>
    </QueryClientProvider>
  );
};
