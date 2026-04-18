const INTRO_TEMPLATES = [
  (city, intent) =>
    `This page provides an overview of ${intent.replace(/-/g, " ")} options available in ${city}.`,

  (city, intent) =>
    `Consumers in ${city} often compare multiple ${intent.replace(/-/g, " ")} options before applying.`,

  (city, intent) =>
    `Here is general information about ${intent.replace(/-/g, " ")} services in ${city}.`
];

const BODY_TEMPLATES = [
  (city, intent) =>
    `Lenders in ${city} may offer different rates, terms, and eligibility requirements depending on applicant profiles.`,

  (city, intent) =>
    `Availability of ${intent.replace(/-/g, " ")} in ${city} can vary based on state regulations and lender policies.`,

  (city, intent) =>
    `It is recommended to compare multiple providers in ${city} before selecting a ${intent.replace(/-/g, " ")} option.`
];

const CTA_TEMPLATES = [
  "Compare Options",
  "View Providers",
  "Check Eligibility",
  "Explore Offers"
];

const DISCLAIMER =
  "This page is for informational purposes only. This site is not a lender and does not make credit decisions.";

/**
 * Random picker utility
 */
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Build full page content block
 */
function buildContent(city, intent) {
  return {
    intro: pick(INTRO_TEMPLATES)(city, intent),
    body: pick(BODY_TEMPLATES)(city, intent),
    cta: pick(CTA_TEMPLATES),
    disclaimer: DISCLAIMER
  };
}

module.exports = {
  buildContent
};
