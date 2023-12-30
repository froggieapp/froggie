import { VNode, h } from "preact";
import "./index.css";

interface ButtonProps {
  children: VNode | string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button = ({ children, onClick, disabled }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled} className="fgr-Button fgr-Button--primary u-shadowSm" type="button">
      {children}
    </button>
  );
};
