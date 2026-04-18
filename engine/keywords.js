const fs = require("fs");

/**
 * Safe keyword intent generator
 * Focus: search queries people already type (not targeting individuals)
 */

const cities = [
  "houston",
  "philadelphia",
  "atlanta",
  "phoenix",
  "chicago",
  "dallas",
  "miami",
  "denver",
  "seattle",
  "boston"
];

const intents = [
  "installment loans",
  "personal loan options",
  "bad credit loans",
  "emergency cash options",
  "loan requirements",
  "same day funding loans",
  "short term loan alternatives"
];

/**
 * Build keyword combinations
 */
function generateKeywords() {
  const keywords = [];

  for (const city of cities) {
    for (const intent of intents) {
      keywords.push(`${intent} in ${city}`);
      keywords.push(`${city} ${intent}`);
    }
  }

  return keywords;
}

/**
 * Add informational SEO queries (higher trust traffic)
 */
function addEducationalKeywords(list) {
  const extras = [
    "how do installment loans work",
    "what affects loan approval",
    "alternatives to payday loans",
    "how personal loans are calculated",
    "what is a good credit score for loans"
  ];

  return list.concat(extras);
}

/**
 * Save keyword file
 */
function saveKeywords() {
  let keywords = generateKeywords();
  keywords = addEducationalKeywords(keywords);

  const output = {
    total: keywords.length,
    keywords
  };

  fs.writeFileSync(
    "./output/keywords.json",
    JSON.stringify(output, null, 2)
  );

  console.log("Keyword file generated:");
  console.log("Total keywords:", output.total);
}

if (require.main === module) {
  saveKeywords();
}

module.exports = {
  saveKeywords
};
