import { h } from "preact";
import { Channel } from "./pages/Channel";
import { Layout } from "./components/Layout";
import { Config } from "./pages/Config";
import { EmptyChannel } from "./components/EmptyChannel";
import { Route, Switch } from "wouter-preact";
import { Overlay } from "./pages/Overlay";

export const Router = () => {
  return (
    <Switch>
      <Route path="/overlay">
        <Overlay />
      </Route>
      <Route path="/channel-overlay/:id">
        <Channel isOverlayMode />
      </Route>
      <Route>
        <Layout>
          <Route path="/channel/:id">
            <Channel />
          </Route>
          <Route path="/config">
            <Config />
          </Route>
          <Route path="/">
            <EmptyChannel />
          </Route>
        </Layout>
      </Route>
    </Switch>
  );
};
