const { runLinkCheck } = require("./link-check");
const { runCrawlSim } = require("./crawl-sim");
const { runValidation } = require("./validate");

const fs = require("fs");

function runBuild() {
  console.log("🚀 Starting build pipeline...\n");

  // STEP 1: (your generator would run before this)
  console.log("✔ Assume pages already generated into /output");

  // STEP 2: validation
  console.log("\n🧪 Running validation...");
  if (runValidation) runValidation();

  // STEP 3: crawl simulation
  console.log("\n🕷 Running crawl simulation...");
  if (runCrawlSim) runCrawlSim();

  // STEP 4: link check
  console.log("\n🔗 Running link check...");
  if (runLinkCheck) runLinkCheck();

  console.log("\n✅ BUILD COMPLETE");
}

runBuild();
