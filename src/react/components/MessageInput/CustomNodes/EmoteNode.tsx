import { addClassNamesToElement } from "@lexical/utils";
import { $applyNodeReplacement, DecoratorNode, LexicalNode, NodeKey, SerializedLexicalNode } from "lexical";
import { EmoteComponent } from "../EmoteComponent";
import { svgEmoji } from "@/react/util/emotes";
import { h } from "preact";

export interface SerializedEmoteNode extends SerializedLexicalNode {
  src: string;
  name: string;
  alt: string;
  isTextEmoji: boolean;
  value: string;
}

interface EmoteNodeOptions {
  src: string;
  name: string;
  alt: string;
  isTextEmoji: boolean;
  value: string;
}

export class EmoteNode extends DecoratorNode<JSX.Element> {
  src: string;
  name: string;
  alt: string;
  value: string;
  isTextEmoji: boolean;

  static getType(): string {
    return "emote";
  }

  static clone(node: EmoteNode): EmoteNode {
    return new EmoteNode(
      {
        src: node.src,
        name: node.name,
        alt: node.alt,
        isTextEmoji: node.isTextEmoji,
        value: node.value,
      },
      node.__key,
    );
  }

  constructor(options: EmoteNodeOptions, key?: NodeKey) {
    super(key);
    this.src = options.src;
    this.name = options.name;
    this.alt = options.alt;
    this.isTextEmoji = options.isTextEmoji;
    this.value = options.value;
  }

  isInline(): boolean {
    return true;
  }

  isKeyboardSelectable(): boolean {
    return true;
  }

  createDOM(): HTMLElement {
    const el = document.createElement("span");
    addClassNamesToElement(
      el,
      this.isTextEmoji ? "fgr-MessageInput-emoteWrapperText" : "fgr-MessageInput-emoteWrapper",
    );
    return el;
  }

  updateDOM(): false {
    return false;
  }

  exportJSON(): SerializedEmoteNode {
    return {
      type: this.getType(),
      version: 1,
      src: this.src,
      name: this.name,
      isTextEmoji: this.isTextEmoji,
      alt: this.alt,
      value: this.value,
    };
  }

  static importJSON(jsonNode: SerializedEmoteNode): EmoteNode {
    return $createEmoteNode({
      src: jsonNode.src,
      name: jsonNode.name,
      alt: jsonNode.alt,
      isTextEmoji: jsonNode.isTextEmoji,
      value: jsonNode.value,
    });
  }

  decorate(): JSX.Element {
    if (this.isTextEmoji) {
      return svgEmoji(this.src, "fgr-MessageInput-emote");
    }
    return <EmoteComponent alt={this.alt} src={this.src} name={this.name} nodeKey={this.getKey()} />;
  }
}

export function $createEmoteNode(options: EmoteNodeOptions): EmoteNode {
  return $applyNodeReplacement(new EmoteNode(options));
}

export function $isEmoteNode(node: LexicalNode | null | undefined): node is EmoteNode {
  return node instanceof EmoteNode;
}
