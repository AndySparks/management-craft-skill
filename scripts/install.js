#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import https from "node:https";
import http from "node:http";
import { fileURLToPath } from "node:url";

const PACKAGE_VERSION = "0.1.0";
const DEFAULT_API_URL = "https://managementcraft.co";
const LICENSE_URL = "https://managementcraft.co/license";

export function parseArgs(argv) {
  if (argv.length === 0) return { command: null, token: null };
  const command = argv[0];
  const token = argv[1] || null;
  return { command, token };
}

export function resolveSkillDir() {
  return path.join(os.homedir(), ".claude", "skills", "management-craft");
}

function apiBase() {
  return process.env.MANAGEMENT_CRAFT_API_URL || DEFAULT_API_URL;
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          resolve({ status: res.statusCode || 0, body: data });
        });
      })
      .on("error", reject);
  });
}

function postJson(url, payload) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    const u = new URL(url);
    const req = lib.request(
      {
        hostname: u.hostname,
        port: u.port || (u.protocol === "https:" ? 443 : 80),
        path: u.pathname + u.search,
        method: "POST",
        headers: { "content-type": "application/json" },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          resolve({ status: res.statusCode || 0, body: data });
        });
      },
    );
    req.on("error", reject);
    req.write(JSON.stringify(payload));
    req.end();
  });
}

function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function packageRoot() {
  const __filename = fileURLToPath(import.meta.url);
  return path.dirname(path.dirname(__filename));
}

function printUsage() {
  console.log("Management Craft Skill");
  console.log("");
  console.log("Usage: npx management-craft install <TOKEN>");
  console.log("");
  console.log(`Get access at ${LICENSE_URL}`);
}

export async function runInstall(token) {
  const base = apiBase();

  // Health check first so a network failure produces a clear message.
  try {
    const health = await getJson(`${base}/api/health`);
    if (health.status !== 200) {
      console.error(
        `Could not reach Management Craft (${base}/api/health returned ${health.status}). Try again in a minute.`,
      );
      return 1;
    }
  } catch (e) {
    console.error(`Could not reach Management Craft (${base}). Check your network and try again.`);
    return 1;
  }

  // Validate token.
  let installRes;
  try {
    installRes = await postJson(`${base}/api/install`, { token });
  } catch (e) {
    console.error(`Network error contacting ${base}/api/install. Try again in a minute.`);
    return 1;
  }

  if (installRes.status === 401) {
    console.error(`Invalid or inactive subscription. Get access at ${LICENSE_URL}`);
    return 1;
  }
  if (installRes.status !== 200) {
    console.error(`Unexpected response from ${base}/api/install: ${installRes.status}`);
    return 1;
  }

  // Copy bundled skill files.
  const sourceSkillDir = path.join(packageRoot(), "skill");
  const destSkillDir = resolveSkillDir();

  if (!fs.existsSync(sourceSkillDir)) {
    console.error(`Bundled skill files missing at ${sourceSkillDir}. This is a packaging bug; please report.`);
    return 1;
  }

  // Clean the destination first so removed/renamed files from prior versions don't linger.
  fs.rmSync(destSkillDir, { recursive: true, force: true });
  copyDirRecursive(sourceSkillDir, destSkillDir);

  console.log(
    `Installed The Craftsman v${PACKAGE_VERSION} to ${destSkillDir}. Open Claude Code and ask any management question.`,
  );
  return 0;
}

async function main() {
  const { command, token } = parseArgs(process.argv.slice(2));
  if (command !== "install") {
    printUsage();
    process.exit(command ? 1 : 0);
  }
  if (!token) {
    printUsage();
    process.exit(1);
  }
  const code = await runInstall(token);
  process.exit(code);
}

// Only run when invoked as CLI; allow imports for testing.
// npx invokes via a `.bin/management-craft` symlink that points at this file.
// Strict equality of argv[1] === fileURLToPath(import.meta.url) misses that
// case (argv[1] is the symlink, not the resolved file). realpathSync resolves
// the symlink to the same absolute path as import.meta.url, so the comparison
// works for both direct (`node scripts/install.js`) and npx invocations.
// Test runners (vitest etc.) have argv[1] pointing at the runner, not this
// file, so this correctly skips main() during imports.
const scriptPath = fileURLToPath(import.meta.url);
let invokedAsCli = false;
if (typeof process.argv[1] === "string") {
  if (process.argv[1] === scriptPath) {
    invokedAsCli = true;
  } else {
    try {
      invokedAsCli = fs.realpathSync(process.argv[1]) === scriptPath;
    } catch {
      invokedAsCli = false;
    }
  }
}
if (invokedAsCli) {
  main();
}
