import "./index.css";
import { h } from "preact";

interface LoginBannerProps {
  children: string;
}

export const LoginBanner = ({ children }: LoginBannerProps) => {
  return <div className="fgr-LoginBanner">{children}</div>;
};
