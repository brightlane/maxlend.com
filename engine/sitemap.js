const fs = require("fs");
const path = require("path");

/**
 * Walks output directory and collects all generated pages
 */
function collectPages(dir, baseUrl = "") {
  let urls = [];

  const items = fs.readdirSync(dir);

  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      urls = urls.concat(
        collectPages(fullPath, baseUrl)
      );
    } else {
      // convert file path → URL
      const urlPath = fullPath
        .replace("./output", "")
        .replace(/\\/g, "/")
        .replace("/index.html", "")
        .replace(".html", "");

      urls.push(`https://yourdomain.com${urlPath}`);
    }
  });

  return urls;
}

/**
 * Generate sitemap.xml
 */
function generateSitemap() {
  const outputDir = "./output";

  const urls = collectPages(outputDir);

  const xml =
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `
  <url>
    <loc>${url}</loc>
  </url>
`).join("")}
</urlset>`;

  fs.writeFileSync(
    path.join(outputDir, "sitemap.xml"),
    xml
  );

  console.log("Sitemap generated with", urls.length, "URLs");
}

module.exports = {
  generateSitemap
};
