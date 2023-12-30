import { h } from "preact";
import "./index.css";

interface AvatarProps {
  alt: string;
  src: string | undefined | null;
  className?: string;
  name: string | undefined | null;
}

export const Avatar: React.FC<AvatarProps> = ({ alt, src, className, name }) => {
  if (!src) {
    return (
      <div className={`fgr-Avatar ${className}`} role="img">
        <span className="fgr-Avatar-text">{name?.charAt(0)}</span>
      </div>
    );
  }
  return <img className={`fgr-Avatar ${className}`} alt={alt} src={src} />;
};
