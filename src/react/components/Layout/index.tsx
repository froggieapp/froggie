import { h, ComponentChildren } from "preact";
import { Toolbar } from "../Toolbar";
import { Sidebar } from "../Sidebar";
import "./index.css";

interface LayoutProps {
  children: ComponentChildren;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Toolbar />
      <div className="layout">
        <Sidebar />
        <div className="layout-section">
          <div className={`main-content`}>{children}</div>
        </div>
      </div>
    </div>
  );
};
