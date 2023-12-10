import { updateRequestHeaders } from "./util";

describe("Updating request headers", () => {
  const requestHeadersTests: {
    source: Record<string, string>;
    set: Record<string, string>;
    result: Record<string, string>;
  }[] = [
    {
      source: {
        origin: "google.com",
      },
      set: {
        Origin: "*",
      },
      // we expect to copy the source with our new value
      result: {
        origin: "*",
      },
    },
    {
      source: {
        Origin: "google.com",
      },
      set: {
        oRiGin: "*",
      },
      result: {
        Origin: "*",
      },
    },
    {
      source: {
        ExtraSourceHeader: "*",
        Origin: "google.com",
      },
      set: {
        Origin: "*",
      },
      result: {
        ExtraSourceHeader: "*",
        Origin: "*",
      },
    },
    {
      source: {
        Origin: "google.com",
      },
      set: {
        ExtraSourceHeader: "*",
        Origin: "*",
      },
      result: {
        ExtraSourceHeader: "*",
        Origin: "*",
      },
    },
    {
      source: {
        origin: "google.com",
      },
      set: {
        ExtraSourceHeader: "*",
        Origin: "*",
      },
      result: {
        ExtraSourceHeader: "*",
        origin: "*",
      },
    },
  ];

  for (let i = 0; i < requestHeadersTests.length; i++) {
    it("should set request headers", () => {
      expect(updateRequestHeaders(requestHeadersTests[i].source, requestHeadersTests[i].set)).toStrictEqual(
        requestHeadersTests[i].result,
      );
    });
  }
});
