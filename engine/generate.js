const fs = require("fs");
const path = require("path");

// -------------------------
// CONFIG
// -------------------------
const cities = [
  "houston",
  "dallas",
  "austin",
  "miami",
  "atlanta",
  "chicago",
  "phoenix",
  "denver"
];

const intents = [
  "installment-loans",
  "personal-loans",
  "debt-consolidation",
  "emergency-loans"
];

const outputDir = path.join(__dirname, "../output");

// -------------------------
// HELPERS
// -------------------------
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function buildTitle(city, intent) {
  return `${intent.replace(/-/g, " ")} in ${city}`;
}

function buildSchema(city, intent) {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": `${intent} - ${city}`,
    "areaServed": city,
    "serviceType": intent
  };
}

function buildPage(city, intent) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>${buildTitle(city, intent)}</title>
  <meta name="description" content="Compare ${intent} options in ${city}. Informational directory.">

  <script type="application/ld+json">
  ${JSON.stringify(buildSchema(city, intent), null, 2)}
  </script>
</head>

<body>

  <h1>${buildTitle(city, intent)}</h1>

  <p>
    This page provides general information about ${intent.replace(/-/g, " ")}
    options in ${city}.
  </p>

  <a href="#">View Providers</a>

  <section>
    <h2>Disclaimer</h2>
    <p>
      This site is an informational directory and is not a lender.
      All financial services are subject to approval.
    </p>
  </section>

</body>
</html>`;
}

// -------------------------
// GENERATION LOGIC
// -------------------------
function generate() {
  ensureDir(outputDir);

  cities.forEach(city => {
    const cityDir = path.join(outputDir, city);
    ensureDir(cityDir);

    intents.forEach(intent => {
      const filePath = path.join(cityDir, `${intent}.html`);
      const html = buildPage(city, intent);

      fs.writeFileSync(filePath, html);
      console.log("Generated:", filePath);
    });
  });

  console.log("\nDONE: SEO site generated.");
}

// -------------------------
// RUN
// -------------------------
generate();
