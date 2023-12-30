import { h } from "preact";
import "./index.css";

interface ErrorMessageProps {
  children: string | undefined | null;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => {
  if (!children) return null;
  return <p className="fgr-ErrorMessage">{children}</p>;
};
