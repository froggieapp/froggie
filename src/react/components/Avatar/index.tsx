import React from "react";
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
      <div className={`avatar ${className}`} role="img">
        <span>{name?.charAt(0)}</span>
      </div>
    );
  }
  return <img className={`avatar ${className}`} alt={alt} src={src} />;
};
