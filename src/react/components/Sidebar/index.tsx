import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChannelList } from "../ChannelList";
import { ArrowUturnLeftIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { useStore } from "src/store/Store";
import "./index.css";

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isConfigPage = location.pathname.includes("config");
  const onClickSettings = () => {
    if (isConfigPage) {
      navigate(-1);
      return;
    }
    navigate("/config");
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
