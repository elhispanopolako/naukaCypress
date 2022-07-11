const { defineConfig } = require('cypress')

module.exports = defineConfig({
  chromeWebSecurity: false,
  retries: 1,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  },
  "reporter": "junit",
  "reporterOptions": {
    "mochaFile": "results/test-results.xml",
    "testCaseSwitchClassnameAndName": false
  }
})
