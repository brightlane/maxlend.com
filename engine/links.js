const fs = require("fs");
const path = require("path");

/**
 * Recursively collect HTML files from output directory
 */
function getHtmlFiles(dir) {
  let results = [];

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (item.endsWith(".html")) {
      results.push(fullPath);
    }
  }

  return results;
}

/**
 * Extract all href links from HTML
 */
function extractLinks(content) {
  const matches = [...content.matchAll(/href=["'](.*?)["']/g)];
  return matches.map(m => m[1]);
}

/**
 * Check if link is internal
 */
function isInternal(link) {
  return (
    !link.startsWith("http") &&
    !link.startsWith("mailto:") &&
    !link.startsWith("#")
  );
}

/**
 * Check a single file for broken links
 */
function checkFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");

  const links = extractLinks(content);
  const internalLinks = links.filter(isInternal);

  const brokenLinks = [];

  for (const link of internalLinks) {
    const targetPath = path.join(path.dirname(filePath), link);
    const normalized = targetPath.split("#")[0];

    if (!fs.existsSync(normalized)) {
      brokenLinks.push(link);
    }
  }

  return {
    file: filePath,
    totalLinks: links.length,
    internalLinks: internalLinks.length,
    brokenLinks
  };
}

/**
 * Run full scan
 */
function runLinkCheck() {
  const dir = "./output";

  if (!fs.existsSync(dir)) {
    console.log("❌ No output directory found.");
    return;
  }

  const files = getHtmlFiles(dir);

  const results = files.map(checkFile);

  const brokenPages = results.filter(
    r => r.brokenLinks.length > 0
  );

  const report = {
    totalPages: results.length,
    pagesWithIssues: brokenPages.length,
    issues: brokenPages
  };

  fs.writeFileSync(
    path.join(dir, "link-report.json"),
    JSON.stringify(report, null, 2)
  );

  console.log("\n=== LINK CHECK COMPLETE ===");
  console.log("Pages scanned:", report.totalPages);
  console.log("Pages with issues:", report.pagesWithIssues);
}

/**
 * Allow direct CLI execution
 */
if (require.main === module) {
  runLinkCheck();
}

module.exports = {
  runLinkCheck
};
