module.exports = {
  site: {
    domain: "https://yourdomain.com",
    name: "Programmatic SEO Engine",
    outputDir: "./output"
  },

  generation: {
    citiesPerRun: "all", // or limit like 50 for testing
    intentsPerCity: "all",

    // controls scale pressure
    enableModifiers: true,
    maxPagesPerCity: 100
  },

  content: {
    minWordCount: 150,
    enableVariation: true,
    rotateTemplates: true
  },

  linking: {
    maxCityLinks: 5,
    maxIntentLinks: 4,
    enableCrossCityLinks: true
  },

  sitemap: {
    enabled: true,
    splitByState: false
  },

  audit: {
    enabled: true,
    flagThinPages: true,
    flagDuplicates: true
  },

  deploy: {
    method: "git", // git | none
    commitMessage: "auto SEO update",
    autoDeploy: false
  }
};
