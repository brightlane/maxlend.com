const { buildAffiliateLink, getCTA } = require("./affiliate");

function buildPage(city, title, intent) {

  const affiliateHTML = buildAffiliateLink(
    "maxlend",
    getCTA("maxlend")
  );

  return `<!DOCTYPE html>
<html>
<head>
  <title>${title}</title>
</head>

<body>

  <h1>${title}</h1>

  <p>Information for ${city} users.</p>

  <div class="cta">
    ${affiliateHTML}
  </div>

</body>
</html>`;
}
