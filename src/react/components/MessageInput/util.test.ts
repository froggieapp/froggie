import { describe, expect, it } from "vitest";
import { searchSuggestionMatches } from "./util";

const tests = [
  {
    // text input and current selection
    input: ["test", 4],
    result: [false, ""],
  },
  {
    input: ["test", 3],
    result: [true, "test"],
  },
  {
    input: ["test ", 4],
    result: [false, ""],
  },
  {
    input: ["test lorem", 3],
    result: [true, "test"],
  },
  {
    input: ["test lorem", 4],
    result: [false, ""],
  },
  {
    input: ["test lorem ", 10],
    result: [false, ""],
  },
  {
    input: ["test ", 0],
    result: [false, ""],
  },
  {
    input: ["", 0],
    result: [false, ""],
  },
  {
    input: [" ", 0],
    result: [false, ""],
  },
  {
    input: ["              ", 0],
    result: [false, ""],
  },
  {
    input: ["a                     ", 5],
    result: [false, ""],
  },
  {
    input: ["                    a", 0],
    result: [false, ""],
  },
  {
    input: [" lorem bcde", 5],
    result: [true, "lorem"],
  },
  {
    input: ["a a a", 2],
    result: [true, "a"],
  },
] as const;

describe("searchSuggestionMatches", () => {
  it("should pass matching test cases", async () => {
    tests.forEach((t) => expect(searchSuggestionMatches(t.input[0], t.input[1])).toStrictEqual(t.result));
  });
});
