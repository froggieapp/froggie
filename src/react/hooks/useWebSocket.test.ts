import WS from "jest-websocket-mock";
import { act, renderHook } from "@testing-library/preact";
import { useWebSocket } from "./useWebSocket";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("useWebSocket", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => "");
  });

  afterEach(() => {
    WS.clean();
  });

  it("should call listeners on correct time", async () => {
    const server = new WS("ws://localhost:1234", { jsonProtocol: true });

    const mockOnOpen = vi.fn(() => {});
    const mockOnClose = vi.fn(() => {});
    const mockBeforeClose = vi.fn(() => {});
    const mockOnError = vi.fn(() => {});
    const mockOnMessage = vi.fn(() => {});

    const { result } = renderHook(() =>
      useWebSocket("ws://localhost:1234", {
        onOpen: mockOnOpen,
        onClose: mockOnClose,
        onBeforeClose: mockBeforeClose,
        onError: mockOnError,
        onMessage: mockOnMessage,
        parseJSON: true,
      }),
    );
    const { send } = result.current;
    expect(mockOnOpen).not.toHaveBeenCalled();
    await server.connected;
    expect(mockOnOpen).toHaveBeenCalledTimes(1);
    server.send({
      data: "my data",
    });
    expect(mockOnMessage).toHaveBeenCalledWith(expect.any(Function), { data: "my data" });
    send({ data: "hello" }, true);
    await expect(server).toReceiveMessage({ data: "hello" });
    expect(mockBeforeClose).not.toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
    expect(mockOnError).not.toHaveBeenCalled();
    act(() => {
      server.close();
    });
    expect(mockBeforeClose).not.toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should call callback with errors", async () => {
    const server = new WS("ws://localhost:1234", { jsonProtocol: true });

    const mockOnOpen = vi.fn(() => {});
    const mockOnClose = vi.fn(() => {});
    const mockBeforeClose = vi.fn(() => {});
    const mockOnError = vi.fn(() => {});
    const mockOnMessage = vi.fn(() => {});

    renderHook(() =>
      useWebSocket("ws://localhost:1234", {
        onOpen: mockOnOpen,
        onClose: mockOnClose,
        onBeforeClose: mockBeforeClose,
        onError: mockOnError,
        onMessage: mockOnMessage,
        parseJSON: true,
      }),
    );
    expect(mockOnOpen).not.toHaveBeenCalled();
    await server.connected;
    expect(mockOnOpen).toHaveBeenCalledTimes(1);
    act(() => {
      server.error();
    });
    expect(mockBeforeClose).not.toHaveBeenCalled();
    expect(mockOnError).toHaveBeenCalledWith("Unknown error");
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should send queued messages", async () => {
    const server = new WS("ws://localhost:1234", { jsonProtocol: true });

    const mockOnOpen = vi.fn(() => {});
    const mockOnClose = vi.fn(() => {});
    const mockBeforeClose = vi.fn(() => {});
    const mockOnError = vi.fn(() => {});
    const mockOnMessage = vi.fn(() => {});

    const { result } = renderHook(() =>
      useWebSocket("ws://localhost:1234", {
        onOpen: mockOnOpen,
        onClose: mockOnClose,
        onBeforeClose: mockBeforeClose,
        onError: mockOnError,
        onMessage: mockOnMessage,
        parseJSON: true,
      }),
    );
    const { send } = result.current;
    const msgs = [{ data: "queued msg 1" }, { data: "queued msg 2" }, { data: "queued msg 3" }];
    for (let i = 0; i < msgs.length; i += 1) send(msgs[i], true);

    expect(mockOnOpen).not.toHaveBeenCalled();
    await expect(server).not.toHaveReceivedMessages(msgs);
    await server.connected;
    for (let i = 0; i < msgs.length; i += 1) await expect(server).toReceiveMessage(msgs[i]);
    act(() => {
      server.error();
    });
  });
});
