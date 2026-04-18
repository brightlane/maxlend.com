function buildInternalLinks(city, cities, intents) {
  // Limit links so pages don't become spammy
  const MAX_CITY_LINKS = 5;
  const MAX_INTENT_LINKS = 4;

  // pick other cities (avoid self-linking)
  const cityLinks = cities
    .filter(c => c !== city)
    .slice(0, MAX_CITY_LINKS)
    .map(c => ({
      label: `${c} loans`,
      url: `/${c}/installment-loans.html`
    }));

  // intent links for same city
  const intentLinks = intents
    .slice(0, MAX_INTENT_LINKS)
    .map(i => ({
      label: i.label,
      url: `/${city}/${i.slug}.html`
    }));

  return {
    cityLinks,
    intentLinks
  };
}

module.exports = {
  buildInternalLinks
};
