import React from "react";
import { ChannelList } from "../ChannelList";
import { ArrowUturnLeftIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { useStore } from "src/store/Store";
import "./index.css";
import { useLocation } from "wouter-preact";
import { usePrevLocation } from "@/react/hooks/usePrevLocation";

export const Sidebar = () => {
  const [location, setLocation] = useLocation();
  const prev = usePrevLocation();
  const isConfigPage = location.includes("config");
  const onClickSettings = () => {
    if (isConfigPage) {
      setLocation(prev ? prev : "/");
      return;
    }
    setLocation("/config");
  };

  const channels = useStore((state) => state.channels);

  return (
    <div className="sidebar">
      <ChannelList channels={channels} />
      <div className="bottom-sidebar-options">
        <button type="button" onClick={onClickSettings}>
          {isConfigPage ? <ArrowUturnLeftIcon className="gear-icon" /> : <Cog6ToothIcon className="gear-icon" />}
        </button>
      </div>
    </div>
  );
};
