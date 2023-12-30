import { h } from "preact";
import "./index.css";

interface InputProps {
  children: React.ReactNode;
  label: string;
}

// todo: fix accessibility here
export const Input: React.FC<InputProps> = ({ children, label }) => {
  return (
    <div className="fgr-Input">
      <p className="fgr-Input-inputLabel">{label}</p>
      {children}
    </div>
  );
};
