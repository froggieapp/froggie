import React from "react";
import { Channel } from "./pages/Channel";
import { Layout } from "./components/Layout";
import { Config } from "./pages/Config";
import { EmptyChannel } from "./components/EmptyChannel";
import { Route } from "wouter-preact";

export const Router = () => {
  return (
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
  );
};
