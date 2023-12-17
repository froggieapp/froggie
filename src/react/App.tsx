import React from "react";
import { Router } from "./Router";
import { Listener } from "./components/Listener";
import { WithSockets } from "./HOCs/WithSockets";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { Modals } from "./Modals";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { EmoteTooltiper } from "./components/EmoteTooltiper";
import { GLOBAL_TOOLTIP } from "./util/tooltips";

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WithSockets>
        <>
          <ReactTooltip className="global-tooltip" id={GLOBAL_TOOLTIP} />
          <EmoteTooltiper />
          <Modals />
          <Listener />
          <Router />
        </>
      </WithSockets>
    </QueryClientProvider>
  );
};
