import React from "react";
import { Program } from "@typescript-tea/core";
import { reactRuntime } from "../react-runtime";

const program: Program<{}, {}, JSX.Element> = {
  init: () => [{}],
  update: () => [{}],
  view: () => <div />
};

test("can call reactRuntime", () => {
  const runtime = reactRuntime(program, []);
  expect(runtime).toBeDefined();
});
