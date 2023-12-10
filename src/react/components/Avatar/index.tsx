import React from "react";
import "./index.css";

interface AvatarProps {
  alt: string;
  src: string | undefined | null;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ alt, src, className }) => {
  if (!src) {
    return <div className={`avatar ${className}`} role="img" />;
  }
  return <img className={`avatar ${className}`} alt={alt} src={src} />;
};
