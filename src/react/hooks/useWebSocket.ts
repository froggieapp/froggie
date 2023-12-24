import { Kick } from "@FroggieTypes/Kick";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";

export enum WebSocketState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

// todo: use unknown here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SendMessageCb = (message: any | { error: string }) => void;
type OnOpenCallback = (sendMessage: SendMessageCb) => void;
type OnCloseCallback = (sendMessage: SendMessageCb) => void;
type OnSendMessageCallback = (
  sendMessage: SendMessageCb,
  message: (Kick.KickEvent & { data: string }) | { error: string },
) => void;

interface WebSocketHookOptions {
  onOpen?: OnOpenCallback;
  onClose?: OnCloseCallback;
  onBeforeClose?: OnCloseCallback;
  onError?: (err: string) => void;
  onMessage?: OnSendMessageCallback;
  skip?: boolean;
  parseJSON?: boolean;
}

export const useWebSocket = (url: string, options?: WebSocketHookOptions) => {
  const ws = useRef<WebSocket | null>(null);
  const messageQueue = useRef<string[]>([]);
  const skip = options?.skip || false;
  const [socketReady, setSocketReady] = useState<boolean>(false);
  const onOpenCb = useRef<OnOpenCallback | null>(null);
  const onCloseCb = useRef<OnCloseCallback | null>(null);
  const onErrorCb = useRef<((err: string) => void) | null>(null);
  const onBeforeCloseCb = useRef<OnCloseCallback | null>(null);
  const onMessageCb = useRef<OnSendMessageCallback | null>(null);
  const shouldParseJSON = options?.parseJSON || false;
  useEffect(() => {
    onOpenCb.current = options?.onOpen || null;
    onCloseCb.current = options?.onClose || null;
    onErrorCb.current = options?.onError || null;
    onMessageCb.current = options?.onMessage || null;
    onBeforeCloseCb.current = options?.onBeforeClose || null;
  });

  const send = useCallback((data: string | ArrayBufferLike | Blob | ArrayBufferView | object, isJSON?: boolean) => {
    const payload = isJSON ? JSON.stringify(data) : data;
    if (ws.current?.readyState === WebSocketState.OPEN) {
      ws.current.send(payload as string);
    } else {
      messageQueue.current.push(payload as string);
    }
  }, []);

  useEffect(() => {
    if (skip || !url) return;
    messageQueue.current = [];
    ws.current = new WebSocket(url);
    const sendWithArgs = (data: string | ArrayBufferLike | Blob | ArrayBufferView) => send(data, shouldParseJSON);
    ws.current.onopen = () => {
      {
        setSocketReady(true);
        onOpenCb.current?.(sendWithArgs);
      }
    };
    ws.current.onclose = () => {
      {
        setSocketReady(false);
        onCloseCb.current?.(sendWithArgs);
      }
    };
    ws.current.onerror = (err) => {
      let errorMsg = "Unknown error";
      if (err instanceof ErrorEvent) {
        errorMsg = err.message;
      } else if (typeof err === "string") {
        errorMsg = err;
      }
      console.error(errorMsg);
      onErrorCb.current?.(errorMsg);
    };
    ws.current.onmessage = (e) => {
      if (!onMessageCb.current) return;
      let message = e.data;

      try {
        if (shouldParseJSON) {
          message = JSON.parse(e.data);
        }
      } catch (e) {
        console.error("Error parsing message", e);
        message = { error: e };
      }
      onMessageCb.current(sendWithArgs, message);
    };
    const wsCurrent = ws.current;
    return () => {
      try {
        onBeforeCloseCb.current?.(sendWithArgs);
      } catch (err) {
        console.error("Error on socket close cb", err);
      }
      if (wsCurrent?.readyState === 1) {
        wsCurrent?.close();
      } else {
        wsCurrent.addEventListener("open", () => {
          wsCurrent.close();
        });
      }
    };
  }, [url, skip, shouldParseJSON, send]);

  useEffect(() => {
    if (socketReady) {
      const messagesToDelete = [...messageQueue.current];
      for (let i = 0; i < messagesToDelete.length; i += 1) {
        const msg = messagesToDelete[i];
        send(msg);
      }
      messageQueue.current = messageQueue.current.filter((msg) => !messagesToDelete.includes(msg));
    }
  }, [socketReady, send]);

  return {
    socketReady,
    send,
  };
};
