const config = require("./config");

/**
 * Affiliate Abstraction Layer
 * --------------------------------
 * Purpose:
 * - keep affiliate logic out of page templates
 * - allow swapping offers safely
 * - support multiple programs later
 */

const OFFERS = {
  maxlend: {
    url: config.affiliate?.maxlend?.url,
    rel: "nofollow sponsored",
    openInNewTab: true,
    label: "Sponsored Offer"
  }
};

/**
 * Validate affiliate exists
 */
function getOffer(key) {
  const offer = OFFERS[key];

  if (!offer) {
    throw new Error(`Affiliate offer not found: ${key}`);
  }

  return offer;
}

/**
 * Render safe HTML link
 */
function renderLink(key, text) {
  const offer = getOffer(key);

  const target = offer.openInNewTab ? "_blank" : "_self";

  return `<a href="${offer.url}" target="${target}" rel="${offer.rel}">
    ${text || offer.label}
  </a>`;
}

/**
 * Safe CTA generator (decoupled from offer)
 */
function getCTA(key) {
  const ctas = {
    maxlend: [
      "Check Eligibility",
      "See Options",
      "View Details"
    ]
  };

  const options = ctas[key] || ["Learn More"];
  return options[Math.floor(Math.random() * options.length)];
}

/**
 * Return full affiliate block (HTML-safe)
 */
function renderCTASection(key) {
  const link = renderLink(key, getCTA(key));

  return `
    <div class="affiliate-cta">
      ${link}
    </div>
  `;
}

module.exports = {
  getOffer,
  renderLink,
  getCTA,
  renderCTASection
};
