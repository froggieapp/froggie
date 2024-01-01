import { VNode, h } from "preact";
import "./index.css";

interface ButtonProps {
  children: VNode | string;
  onClick: () => void;
  disabled?: boolean;
  "data-testid"?: string;
}

export const Button = ({ children, onClick, disabled, ...props }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      {...props}
      disabled={disabled}
      className="fgr-Button fgr-Button--primary u-shadowSm"
      type="button"
    >
      {children}
    </button>
  );
};
