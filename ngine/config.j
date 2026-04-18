const config = require("./config");

function buildPage(city, title, intent) {

  const affiliateUrl = config.affiliate.maxlend.url;
  const ctaText = config.affiliate.maxlend.ctaText;

  return `<!DOCTYPE html>
<html>
<head>
  <title>${title}</title>
</head>

<body>

  <h1>${title}</h1>

  <p>Information about loan options in ${city}.</p>

  <a href="${affiliateUrl}" target="_blank" rel="nofollow sponsored">
    ${ctaText}
  </a>

</body>
</html>`;
}
