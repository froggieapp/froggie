import React from "react";
import { Toolbar } from "../Toolbar";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import "./index.css";

export const Layout = () => {
  return (
    <div>
      <Toolbar />
      <div className="layout">
        <Sidebar />
        <div className="layout-section">
          <div className={`main-content`}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
