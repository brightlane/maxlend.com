const fs = require("fs");
const path = require("path");

/**
 * Read all generated HTML files
 */
function getAllPages(dir) {
  let pages = [];

  const items = fs.readdirSync(dir);

  items.forEach(item => {
    const fullPath = path.join(dir, item);

    if (fs.statSync(fullPath).isDirectory()) {
      pages = pages.concat(getAllPages(fullPath));
    } else if (item.endsWith(".html")) {
      pages.push(fullPath);
    }
  });

  return pages;
}

/**
 * Basic quality checks per page
 */
function analyzePage(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");

  const wordCount = content.split(/\s+/).length;
  const hasTitle = content.includes("<title>");
  const hasH1 = content.includes("<h1>");
  const hasMetaDesc = content.includes("description");

  // crude duplication signal (very important for SEO systems)
  const repeatedTextPenalty =
    (content.match(/installment loans/g) || []).length > 10;

  return {
    file: filePath,
    wordCount,
    hasTitle,
    hasH1,
    hasMetaDesc,
    likelyThinContent: wordCount < 200,
    likelyDuplicate: repeatedTextPenalty
  };
}

/**
 * Full audit run
 */
function runAudit() {
  const dir = "./output";

  if (!fs.existsSync(dir)) {
    console.log("No output directory found.");
    return;
  }

  const pages = getAllPages(dir);

  const report = pages.map(analyzePage);

  const issues = {
    thinPages: report.filter(p => p.likelyThinContent),
    duplicates: report.filter(p => p.likelyDuplicate),
    missingMeta: report.filter(p => !p.hasMetaDesc)
  };

  fs.writeFileSync(
    "./output/audit-report.json",
    JSON.stringify({ report, issues }, null, 2)
  );

  console.log("Audit complete:");
  console.log("Pages scanned:", report.length);
  console.log("Thin pages:", issues.thinPages.length);
  console.log("Possible duplicates:", issues.duplicates.length);
}

module.exports = { runAudit };
