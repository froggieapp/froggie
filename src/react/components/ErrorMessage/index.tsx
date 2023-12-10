import React from "react";
import "./index.css";

interface ErrorMessageProps {
  children: string | undefined | null;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => {
  if (!children) return null;
  return <p className="error-message">{children}</p>;
};
