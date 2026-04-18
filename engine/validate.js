const fs = require("fs");
const path = require("path");

/**
 * Recursively collect HTML files
 */
function getFiles(dir, ext = ".html") {
  let results = [];

  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(getFiles(fullPath, ext));
    } else if (file.endsWith(ext)) {
      results.push(fullPath);
    }
  });

  return results;
}

/**
 * Validate a single HTML file
 */
function validateFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");

  const issues = [];

  if (!content.includes("<title>")) {
    issues.push("Missing <title>");
  }

  if (!content.includes("<h1>")) {
    issues.push("Missing <h1>");
  }

  if (!content.includes("description")) {
    issues.push("Missing meta description");
  }

  if (content.length < 500) {
    issues.push("Page too thin (<500 chars)");
  }

  return {
    file: filePath,
    valid: issues.length === 0,
    issues
  };
}

/**
 * Run full validation
 */
function runValidation() {
  const dir = "./output";

  if (!fs.existsSync(dir)) {
    console.log("No output directory found.");
    return;
  }

  const files = getFiles(dir);

  const results = files.map(validateFile);

  const invalid = results.filter(r => !r.valid);

  const report = {
    total: results.length,
    valid: results.length - invalid.length,
    invalid: invalid.length,
    issues: invalid
  };

  fs.writeFileSync(
    "./output/validation-report.json",
    JSON.stringify(report, null, 2)
  );

  console.log("Validation complete:");
  console.log(`Total: ${report.total}`);
  console.log(`Valid: ${report.valid}`);
  console.log(`Invalid: ${report.invalid}`);
}

module.exports = {
  runValidation
};
