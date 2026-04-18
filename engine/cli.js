const { execSync } = require("child_process");
const config = require("./config");

function log(msg) {
  console.log(`[SEO CLI] ${msg}`);
}

function runStep(name, command) {
  log(`Running: ${name}`);
  execSync(command, { stdio: "inherit" });
}

function start() {
  console.log("\n==================================");
  console.log("   PROGRAMMATIC SEO ENGINE");
  console.log("==================================\n");

  // STEP 1: Generate site
  runStep("Generate Pages", "node engine/generate.js");

  // STEP 2: Build sitemap
  if (config.sitemap.enabled) {
    runStep("Generate Sitemap", "node -e \"require('./engine/sitemap').generateSitemap()\"");
  }

  // STEP 3: Run audit
  if (config.audit.enabled) {
    runStep("Run Audit", "node -e \"require('./engine/audit').runAudit()\"");
  }

  // STEP 4: Optional deploy
  if (config.deploy.method === "git" && config.deploy.autoDeploy) {
    runStep(
      "Git Deploy",
      `git add . && git commit -m "${config.deploy.commitMessage}" && git push origin main`
    );
  }

  console.log("\n==================================");
  console.log("   BUILD COMPLETE");
  console.log("==================================\n");
}

// RUN SYSTEM
start();
