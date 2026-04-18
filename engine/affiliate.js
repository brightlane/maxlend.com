const config = require("./config");

/**
 * Centralized affiliate manager
 * - prevents hardcoding links everywhere
 * - allows future rotation / A/B testing
 */

const AFFILIATES = {
  maxlend: {
    url: config.affiliate?.maxlend?.url,
    rel: "nofollow sponsored",
    openInNewTab: true,
    trackingLabel: "maxlend_main_cta"
  }
};

/**
 * Get affiliate config safely
 */
function getAffiliate(key) {
  if (!AFFILIATES[key]) {
    throw new Error(`Affiliate key not found: ${key}`);
  }
  return AFFILIATES[key];
}

/**
 * Build safe HTML anchor tag
 */
function buildAffiliateLink(key, text = "Learn More") {
  const aff = getAffiliate(key);

  const target = aff.openInNewTab ? `_blank` : `_self`;

  return `<a href="${aff.url}" target="${target}" rel="${aff.rel}">
    ${text}
  </a>`;
}

/**
 * Optional: swap CTAs without touching pages
 */
function getCTA(key) {
  const map = {
    maxlend: "Check Eligibility",
  };

  return map[key] || "Learn More";
}

module.exports = {
  getAffiliate,
  buildAffiliateLink,
  getCTA
};
