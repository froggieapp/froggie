import { NodeKey } from "lexical";
import { h } from "preact";

interface EmoteComponentProps {
  src: string;
  name: string;
  nodeKey: NodeKey;
  alt: string;
}

export const EmoteComponent = ({ src, alt }: EmoteComponentProps) => {
  return <img className="fgr-MessageInput-emote" src={src} alt={alt} />;
};
