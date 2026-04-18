const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

/**
 * Simple build step wrapper
 */
function buildSite() {
  console.log("Building site...");

  execSync("node engine/generate.js", { stdio: "inherit" });

  console.log("Build complete.");
}

/**
 * Optional: commit and push to Git (for Vercel/Netlify auto deploy)
 */
function pushToGit() {
  console.log("Pushing to Git repository...");

  try {
    execSync("git add .", { stdio: "inherit" });
    execSync('git commit -m "auto build: SEO site update"', { stdio: "inherit" });
    execSync("git push origin main", { stdio: "inherit" });

    console.log("Push complete.");
  } catch (err) {
    console.error("Git push failed:", err.message);
  }
}

/**
 * Optional: clean output folder before rebuild
 */
function cleanOutput() {
  const outputDir = path.join(__dirname, "../output");

  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
    console.log("Cleaned output directory.");
  }
}

/**
 * FULL PIPELINE
 */
function deploy() {
  console.log("=== SEO DEPLOY PIPELINE START ===");

  cleanOutput();
  buildSite();
  pushToGit();

  console.log("=== DEPLOY COMPLETE ===");
}

// RUN
deploy();
