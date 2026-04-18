const fs = require("fs");
const path = require("path");

/**
 * Collect all HTML pages
 */
function getPages(dir) {
  let pages = [];

  const items = fs.readdirSync(dir);

  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      pages = pages.concat(getPages(fullPath));
    } else if (item.endsWith(".html")) {
      pages.push(fullPath);
    }
  });

  return pages;
}

/**
 * Estimate "crawl depth"
 * (simple heuristic: deeper paths = harder to discover)
 */
function getDepth(filePath) {
  const parts = filePath.split(path.sep);
  const outputIndex = parts.indexOf("output");

  return parts.length - outputIndex - 2;
}

/**
 * Analyze page structure
 */
function analyzePage(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");

  const links = (content.match(/href=/g) || []).length;
  const hasTitle = content.includes("<title>");
  const hasH1 = content.includes("<h1>");

  return {
    file: filePath,
    depth: getDepth(filePath),
    linkCount: links,
    hasTitle,
    hasH1,
    score:
      (hasTitle ? 2 : 0) +
      (hasH1 ? 2 : 0) +
      Math.max(0, 10 - getDepth(filePath)) +
      Math.min(links, 5)
  };
}

/**
 * Run crawl simulation
 */
function runCrawlSim() {
  const dir = "./output";

  if (!fs.existsSync(dir)) {
    console.log("No output directory found.");
    return;
  }

  const pages = getPages(dir);

  const results = pages.map(analyzePage);

  // Sort by "crawl priority score"
  const sorted = results.sort((a, b) => b.score - a.score);

  const report = {
    totalPages: pages.length,
    topPages: sorted.slice(0, 10),
    lowPriorityPages: sorted.slice(-10)
  };

  fs.writeFileSync(
    "./output/crawl-report.json",
    JSON.stringify(report, null, 2)
  );

  console.log("Crawl simulation complete:");
  console.log("Pages analyzed:", pages.length);
  console.log("Top priority pages:", report.topPages.length);
}

module.exports = {
  runCrawlSim
};
