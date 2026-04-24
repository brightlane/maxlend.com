const fs = require("fs");
const path = require("path");

// Always resolve from repo root
const keywordsPath = path.join(process.cwd(), "keywords.json");

if (!fs.existsSync(keywordsPath)) {
  console.error("Looking for:", keywordsPath);
  throw new Error("keywords.json not found in repo root");
}

const { keywords } = JSON.parse(
  fs.readFileSync(keywordsPath, "utf-8")
);

console.log(`Loaded ${keywords.length} keywords`);

// Example generator loop (replace with your real build logic)
keywords.forEach((kw) => {
  console.log("Generating page for:", kw);
});
