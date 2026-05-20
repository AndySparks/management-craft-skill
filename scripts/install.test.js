import { describe, it, expect } from "vitest";
import { parseArgs, resolveSkillDir, resolveLegacySkillDir } from "./install.js";
import os from "node:os";
import path from "node:path";

describe("parseArgs", () => {
  it("parses token", () => {
    expect(parseArgs(["sub_1Abc"])).toEqual({ token: "sub_1Abc" });
  });

  it("returns token:null when no args", () => {
    expect(parseArgs([])).toEqual({ token: null });
  });

  it("ignores extra args after token", () => {
    expect(parseArgs(["sub_1Abc", "extra"])).toEqual({ token: "sub_1Abc" });
  });
});

describe("resolveSkillDir", () => {
  it("resolves to ~/.claude/skills/mgmtcraft/", () => {
    expect(resolveSkillDir()).toBe(
      path.join(os.homedir(), ".claude", "skills", "mgmtcraft"),
    );
  });
});

describe("resolveLegacySkillDir", () => {
  it("resolves to ~/.claude/skills/management-craft/ (pre-0.2.0 path)", () => {
    expect(resolveLegacySkillDir()).toBe(
      path.join(os.homedir(), ".claude", "skills", "management-craft"),
    );
  });
});
