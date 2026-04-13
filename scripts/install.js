#!/usr/bin/env node

/**
 * Management Craft Skill installer
 *
 * Alpha state: the real install flow is pending the alpha auth endpoint at
 * managementcraft.co/api/install. See the Craftsman Alpha punch list in the
 * management-craft repo (docs/TASKS.md) for current status.
 *
 * When the real flow is wired up, this script will:
 *   1. Prompt for a token (or accept --token=XXX)
 *   2. POST the token to managementcraft.co/api/install
 *   3. On success, download the skill payload + copy files to
 *      ~/.claude/skills/management-craft/
 *   4. On failure, print the subscription prompt and exit non-zero
 */

const command = process.argv[2];

const helpText = `Management Craft Skill

Usage: npx management-craft install

The Craftsman is a management advisor built from a cited synthesis of
canonical management research. Install it as a Claude Code skill and it
becomes available inside any Claude Code session.

Status: alpha. The install flow is not yet wired up. Alpha users receive
install instructions directly via email. Visit https://managementcraft.co
for access.

Learn more: https://managementcraft.co
`;

if (command === "install") {
  console.log("Management Craft Skill — alpha installer");
  console.log("");
  console.log("The alpha install flow is not yet wired up. If you are an");
  console.log("alpha user, check your email for direct install instructions.");
  console.log("");
  console.log("For access, visit https://managementcraft.co");
  console.log("");
  process.exit(1);
}

console.log(helpText);
process.exit(0);
