import { StoreEmote } from "@/react/store/createEmoteStore";
import { VNode, createContext, h } from "preact";
import { useContext, useEffect, useMemo, useState } from "preact/hooks";

type Suggestions = null | StoreEmote[];
type CallbackFn = (newSuggestion: Suggestions) => void;
type CallbackIdxFn = (idx: number) => void;
type SubscribeFn = (callbackFn: CallbackFn) => () => void;
type SubscribeIdxFn = (callbackFn: CallbackIdxFn) => () => void;

type SuggestionContext = [SubscribeFn, SubscribeIdxFn, (s: Suggestions) => void, (idx: number) => void];

const SuggestionContext = createContext<SuggestionContext>([() => () => {}, () => () => {}, () => {}, () => {}]);

export const SharedSuggestionContext = ({ children }: { children: VNode | VNode[] }): VNode => {
  const context: SuggestionContext = useMemo(() => {
    let suggestion: Suggestions | null = null;
    let idx = 0;
    const listenersSuggestions: Set<CallbackFn> = new Set();
    const listenersIdx: Set<CallbackIdxFn> = new Set();
    return [
      (cb: CallbackFn) => {
        cb(suggestion);
        listenersSuggestions.add(cb);
        return () => {
          listenersSuggestions.delete(cb);
        };
      },
      (cb: CallbackIdxFn) => {
        cb(idx);
        listenersIdx.add(cb);
        return () => {
          listenersIdx.delete(cb);
        };
      },
      (newSuggestion: Suggestions) => {
        suggestion = newSuggestion;
        for (const listener of listenersSuggestions) {
          listener(newSuggestion);
        }
      },
      (newIdx: number) => {
        idx = newIdx;
        for (const listener of listenersIdx) {
          listener(newIdx);
        }
      },
    ];
  }, []);
  return <SuggestionContext.Provider value={context}>{children}</SuggestionContext.Provider>;
};

export const useSharedSuggestionContext = () => {
  const [subscribe, subscribeIdx, publishSuggestions, publishIdx]: SuggestionContext = useContext(SuggestionContext);
  const [suggestions, setSuggestions] = useState<Suggestions>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  useEffect(() => {
    return subscribe((newSuggestions: Suggestions) => {
      setActiveIdx(0);
      setSuggestions(newSuggestions);
    });
  }, [subscribe]);

  useEffect(() => {
    return subscribeIdx((newIdx: number) => {
      setActiveIdx(newIdx);
    });
  }, [subscribeIdx]);

  return [suggestions, publishSuggestions, activeIdx, publishIdx] as const;
};
