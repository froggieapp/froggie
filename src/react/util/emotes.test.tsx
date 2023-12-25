import { VNode, h } from "preact";
import { DefaultEmote } from "../components/DefaultEmote";
import { StoreEmote } from "../store/createEmoteStore";
import { parseStoreEmotes } from "./emotes";

const mockEmotes: StoreEmote[] = [
  {
    isLocked: false,
    id: "1",
    name: "peepoHappy",
    value: "peepoHappy",
    src: "www.froggie.tv",
  },
];

const mockMultiple: StoreEmote[] = [
  {
    isLocked: false,
    id: "2",
    name: "peepoHappy",
    value: "peepoHappy",
    src: "www.froggie.tv",
  },
  {
    isLocked: false,
    id: "2",
    name: "widePeepoHappy",
    value: "widePeepoHappy",
    src: "www.froggie.tv",
  },
];

const mapToProps = (c: (VNode | string)[]) => c.map((e) => (typeof e === "string" ? e : e.props));

const tests = [
  {
    input: "test peepoHappy test",
    output: ["test ", <DefaultEmote key={0} src="www.froggie.tv" name="peepoHappy" />, " test"],
  },
  {
    input: "test peepoHappypeepoHappy test",
    output: [
      "test ",
      <DefaultEmote key={0} src="www.froggie.tv" name="peepoHappy" />,
      <DefaultEmote key={0} src="www.froggie.tv" name="peepoHappy" />,
      " test",
    ],
  },
  {
    input: "test test",
    output: ["test test"],
  },
  {
    input: "peepoHappy",
    output: [<DefaultEmote key={0} src="www.froggie.tv" name="peepoHappy" />],
  },
  {
    input: "",
    output: [],
  },
  {
    input: "test peepoHappy",
    output: ["test ", <DefaultEmote key={0} src="www.froggie.tv" name="peepoHappy" />],
  },
  {
    input: "peepoHappy test",
    output: [<DefaultEmote key={0} src="www.froggie.tv" name="peepoHappy" />, " test"],
  },
];

describe("parseStoreEmotes", () => {
  it("should parse string into preact nodes", async () => {
    tests.forEach((t) => expect(mapToProps(parseStoreEmotes(t.input, mockEmotes))).toEqual(mapToProps(t.output)));
    tests.forEach((t) => expect(mapToProps(parseStoreEmotes(t.input, mockMultiple))).toEqual(mapToProps(t.output)));
  });
});
