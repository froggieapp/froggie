import { LexicalNode, NodeKey, SerializedLexicalNode, Spread, $applyNodeReplacement, DecoratorNode } from "lexical";
import { VNode, h } from "preact";
import { useSharedSuggestionContext } from "../context/SharedSuggestionContext";
import { MessageInputSuggestion } from "../../MessageInputSuggestion";

export const UUID = Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, "")
  .substr(0, 5);

export type SerializedSuggestionNode = Spread<
  {
    uuid: string;
  },
  SerializedLexicalNode
>;

export class SuggestionNode extends DecoratorNode<VNode | null> {
  __uuid: string;

  static getType(): string {
    return "suggestion";
  }

  static clone(node: SuggestionNode): SuggestionNode {
    return new SuggestionNode(node.__uuid, node.__key);
  }

  constructor(uuid: string, key?: NodeKey) {
    super(key);
    this.__uuid = uuid;
  }

  createDOM(): HTMLElement {
    return document.createElement("span");
  }

  updateDOM(): boolean {
    return false;
  }

  isKeyboardSelectable(): boolean {
    return false;
  }

  isInline(): boolean {
    return true;
  }

  static importJSON(serializedNode: SerializedSuggestionNode): SuggestionNode {
    const node = $createSuggestionNode(serializedNode.uuid);
    return node;
  }

  exportJSON(): SerializedSuggestionNode {
    return {
      type: "suggestion",
      uuid: this.__uuid,
      version: 1,
    };
  }

  decorate(): VNode | null {
    if (this.__uuid !== UUID) {
      return null;
    }
    return <SuggestionComponent />;
  }
}

export function $createSuggestionNode(uuid: string): SuggestionNode {
  return $applyNodeReplacement(new SuggestionNode(uuid));
}

export function $isSuggestionNode(node: LexicalNode | null | undefined): node is SuggestionNode {
  return node instanceof SuggestionNode;
}

const SuggestionComponent = () => {
  const [suggestions, , activeIdx] = useSharedSuggestionContext();

  return <MessageInputSuggestion activeSuggestion={activeIdx || 0} suggestions={suggestions || []} />;
};
