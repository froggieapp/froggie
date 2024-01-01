import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getNearestNodeFromDOMNode,
  $getSelection,
  $isDecoratorNode,
  $isNodeSelection,
  COMMAND_PRIORITY_LOW,
  CommandListener,
  KEY_ARROW_LEFT_COMMAND,
  KEY_ARROW_RIGHT_COMMAND,
} from "lexical";
import { useEffect } from "preact/hooks";

export const DecoratorArrowNavigation = () => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    const $handleNavigate: (dir: "left" | "right") => CommandListener<KeyboardEvent> = (dir) => (e) => {
      const selection = $getSelection();
      const node = $getNearestNodeFromDOMNode(e.target as HTMLElement);
      const isRight = dir === "right";
      if ($isNodeSelection(selection) && (!isRight || !$isDecoratorNode(node))) {
        const nodes = selection.getNodes();
        if (nodes.length > 0) {
          e.preventDefault();
          isRight ? nodes[0].selectNext(0, 0) : nodes[0].selectPrevious();
          return true;
        }
      }
      return false;
    };

    return mergeRegister(
      editor.registerCommand(KEY_ARROW_LEFT_COMMAND, $handleNavigate("left"), COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_ARROW_RIGHT_COMMAND, $handleNavigate("right"), COMMAND_PRIORITY_LOW),
    );
  }, [editor]);

  return null;
};
