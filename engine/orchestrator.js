const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// import system modules
const { runAudit } = require("./audit");
const { generateSitemap } = require("./sitemap");

// -----------------------------
// CONFIG
// -----------------------------
const CONFIG = {
  cleanOutput: true,
  generateSite: true,
  buildSitemap: true,
  runAudit: true,
  deployGit: false, // toggle if needed
  outputDir: "./output"
};

// -----------------------------
// UTILITIES
// -----------------------------
function log(msg) {
  console.log(`[SEO ENGINE] ${msg}`);
}

function cleanOutput() {
  if (fs.existsSync(CONFIG.outputDir)) {
    fs.rmSync(CONFIG.outputDir, { recursive: true, force: true });
    log("Output directory cleaned");
  }
}

// -----------------------------
// PIPELINE STEPS
// -----------------------------
function generateSite() {
  log("Generating site...");
  execSync("node engine/generate.js", { stdio: "inherit" });
}

function buildSitemap() {
  log("Building sitemap...");
  generateSitemap();
}

function auditSite() {
  log("Running audit...");
  runAudit();
}

function deployGit() {
  log("Deploying via Git...");

  try {
    execSync("git add .", { stdio: "inherit" });
    execSync('git commit -m "SEO auto deploy update"', { stdio: "inherit" });
    execSync("git push origin main", { stdio: "inherit" });
  } catch (err) {
    console.error("Git deploy failed:", err.message);
  }
}

// -----------------------------
// MAIN RUNNER
// -----------------------------
function run() {
  console.log("\n==========================");
  console.log("   SEO ENGINE START");
  console.log("==========================\n");

  if (CONFIG.cleanOutput) cleanOutput();

  if (CONFIG.generateSite) generateSite();

  if (CONFIG.buildSitemap) buildSitemap();

  if (CONFIG.runAudit) auditSite();

  if (CONFIG.deployGit) deployGit();

  console.log("\n==========================");
  console.log("   SEO ENGINE COMPLETE");
  console.log("==========================\n");
}

// RUN
run();
