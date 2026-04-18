const fs = require("fs");
const path = require("path");

/**
 * Recursively collect HTML files
 */
function getHtmlFiles(dir) {
  let results = [];

  const items = fs.readdirSync(dir);

  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (item.endsWith(".html")) {
      results.push(fullPath);
    }
  });

  return results;
}

/**
 * Extract all links from HTML
 */
function extractLinks(content) {
  const matches = [...content.matchAll(/href=["'](.*?)["']/g)];
  return matches.map(m => m[1]);
}

/**
 * Check if link is internal
 */
function isInternal(link) {
  return !link.startsWith("http") && !link.startsWith("mailto:");
}

/**
 * Validate a single file
 */
function checkFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");

  const links = extractLinks(content);
  const internalLinks = links.filter(isInternal);

  const broken = [];

  internalLinks.forEach(link => {
    const targetPath = path.join(
      path.dirname(filePath),
      link
    );

    const normalized = targetPath.split("#")[0];

    if (!fs.existsSync(normalized)) {
      broken.push(link);
    }
  });

  return {
    file: filePath,
    totalLinks: links.length,
    internalLinks: internalLinks.length,
    brokenLinks: broken
  };
}

/**
 * Run full link integrity scan
 */
function runLinkCheck() {
  const dir = "./output";

  if (!fs.existsSync(dir)) {
    console.log("No output directory found.");
    return;
  }

  const files = getHtmlFiles(dir);

  const results = files.map(checkFile);

  const brokenPages = results.filter(r => r.brokenLinks.length > 0);

  const report = {
    totalPages: files.length,
    pagesWithBrokenLinks: brokenPages.length,
    issues: brokenPages
  };

  fs.writeFileSync(
    "./output/link-report.json",
    JSON.stringify(report, null, 2)
  );

  console.log("Link integrity check complete:");
  console.log("Pages scanned:", files.length);
  console.log("Pages with issues:", brokenPages.length);
}

module.exports = {
  runLinkCheck
};
