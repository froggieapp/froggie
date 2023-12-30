import { Router } from "./Router";
import { Listener } from "./components/Listener";
import { WithSockets } from "./HOCs/WithSockets";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { Modals } from "./Modals";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { EmoteTooltiper } from "./components/EmoteTooltiper";
import { GLOBAL_TOOLTIP } from "./util/tooltips";
import { h, Fragment } from "preact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WithSockets>
          <>
            <div className="global-tooltip-wrapper">
              <ReactTooltip disableStyleInjection className="global-tooltip u-shadowLg" id={GLOBAL_TOOLTIP} />
              <EmoteTooltiper />
            </div>
            <Modals />
            <Listener />
            <Router />
          </>
        </WithSockets>
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
};
