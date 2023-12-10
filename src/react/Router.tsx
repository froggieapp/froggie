import React from "react";
import { Route, Routes } from "react-router-dom";
import { Channel } from "./pages/Channel";
import { Layout } from "./components/Layout";
import { Config } from "./pages/Config";
import { EmptyChannel } from "./components/EmptyChannel";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/channel/:id" element={<Channel />} />
        <Route path="/config" element={<Config />} />
        <Route index element={<EmptyChannel />} />
      </Route>
    </Routes>
  );
};
