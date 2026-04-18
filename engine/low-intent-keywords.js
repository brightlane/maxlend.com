const fs = require("fs");

/**
 * Low-competition SEO keyword generator
 * Focus: informational + question-based search intent (safe, scalable SEO)
 */

const topics = [
  "installment loan approval",
  "personal loan requirements",
  "loan denial reasons",
  "credit score impact loans",
  "loan pre-approval process",
  "income verification loans",
  "secured vs unsecured loans",
  "loan interest calculation",
  "debt consolidation basics",
  "loan eligibility factors"
];

const questionPrefixes = [
  "what is",
  "how does",
  "why does",
  "how to",
  "what happens if",
  "difference between",
  "is it possible to",
  "best way to"
];

/**
 * Build long-tail question keywords
 */
function generateKeywords() {
  const keywords = [];

  for (const topic of topics) {
    for (const prefix of questionPrefixes) {
      keywords.push(`${prefix} ${topic}`);
    }

    // add direct informational variations
    keywords.push(`${topic} explained`);
    keywords.push(`${topic} guide`);
    keywords.push(`understanding ${topic}`);
  }

  return keywords;
}

/**
 * Add high-intent informational queries (still safe SEO)
 */
function addSupportingKeywords(list) {
  const extras = [
    "how loan approval works step by step",
    "factors that affect personal loan approval",
    "why loans get rejected even with good credit",
    "how lenders evaluate income stability",
    "what increases chances of loan approval"
  ];

  return list.concat(extras);
}

/**
 * Save output for generator pipeline
 */
function saveKeywords() {
  let keywords = generateKeywords();
  keywords = addSupportingKeywords(keywords);

  const output = {
    strategy: "low_competition_question_intent",
    total: keywords.length,
    keywords
  };

  const dir = "./output";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(
    "./output/low-intent-keywords.json",
    JSON.stringify(output, null, 2)
  );

  console.log("Low competition keyword set generated");
  console.log("Total:", output.total);
}

if (require.main === module) {
  saveKeywords();
}

module.exports = {
  saveKeywords
};
