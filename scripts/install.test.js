import { describe, it, expect } from "vitest";
import { parseArgs, resolveSkillDir } from "./install.js";
import os from "node:os";
import path from "node:path";

describe("parseArgs", () => {
  it("parses install + token", () => {
    expect(parseArgs(["install", "sub_1Abc"])).toEqual({
      command: "install",
      token: "sub_1Abc",
    });
  });

  it("returns command:null when no args", () => {
    expect(parseArgs([])).toEqual({ command: null, token: null });
  });

  it("returns token:null when install has no token", () => {
    expect(parseArgs(["install"])).toEqual({ command: "install", token: null });
  });

  it("ignores extra args after token", () => {
    expect(parseArgs(["install", "sub_1Abc", "extra"])).toEqual({
      command: "install",
      token: "sub_1Abc",
    });
  });
});

describe("resolveSkillDir", () => {
  it("resolves to ~/.claude/skills/management-craft/", () => {
    expect(resolveSkillDir()).toBe(
      path.join(os.homedir(), ".claude", "skills", "management-craft"),
    );
  });
});
