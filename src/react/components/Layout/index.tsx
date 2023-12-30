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
      <div className="fgr-Layout">
        <Sidebar />
        <div className="fgr-Layout-section">
          <div className="fgr-Layout-content">{children}</div>
        </div>
      </div>
    </div>
  );
};
