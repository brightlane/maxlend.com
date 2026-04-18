const BASE_INTENTS = [
  {
    slug: "installment-loans",
    label: "Installment Loans"
  },
  {
    slug: "personal-loans",
    label: "Personal Loans"
  },
  {
    slug: "emergency-loans",
    label: "Emergency Loans"
  },
  {
    slug: "debt-consolidation",
    label: "Debt Consolidation Loans"
  }
];

// Optional expansion modifiers (keeps things scalable & less repetitive)
const MODIFIERS = [
  "low credit",
  "bad credit",
  "fast approval",
  "same day",
  "online application"
];

// Build keyword variations per city + intent
function buildKeywordMatrix(city) {
  const results = [];

  BASE_INTENTS.forEach(intent => {
    // base version
    results.push({
      slug: intent.slug,
      title: `${intent.label} in ${city}`,
      city,
      intent: intent.slug
    });

    // expanded versions (intent + modifier)
    MODIFIERS.forEach(mod => {
      results.push({
        slug: `${intent.slug}-${mod.replace(/ /g, "-")}`,
        title: `${mod} ${intent.label} in ${city}`,
        city,
        intent: intent.slug
      });
    });
  });

  return results;
}

module.exports = {
  buildKeywordMatrix
};
