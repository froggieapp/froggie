import { VNode, h } from "preact";

export const stringRegexToJsx = (
  msg: string,
  regex: RegExp,
  renderFn: (match: RegExpExecArray, key: number) => VNode,
) => {
  const parsedResult: VNode[] = [];
  const matches = msg.matchAll(regex);
  let lastIdx = 0;
  let i = 0;
  for (const match of matches) {
    if (match.index !== undefined && match.length >= 3) {
      const matchText = match[0];
      if (lastIdx !== match.index) {
        parsedResult.push(<span key={i}>{msg.substring(lastIdx, match.index)}</span>);
        i += 1;
      }
      parsedResult.push(renderFn(match as RegExpExecArray, i));
      lastIdx = match.index + matchText.length;
      i += 1;
    }
  }
  if (!parsedResult.length) return msg;
  if (lastIdx < msg.length) {
    parsedResult.push(<span key={i}>{msg.substring(lastIdx)}</span>);
  }
  return parsedResult;
};
