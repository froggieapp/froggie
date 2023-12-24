import { splitArrayInChunks } from "./util";

describe("splitArrayInChunks", () => {
  it("should split array in multiple chunks", async () => {
    expect(splitArrayInChunks(["a", "b", "c"], 2)).toStrictEqual([["a", "b"], ["c"]]);
    expect(splitArrayInChunks(["a", "b", "c", "d"], 2)).toStrictEqual([
      ["a", "b"],
      ["c", "d"],
    ]);
  });
});
