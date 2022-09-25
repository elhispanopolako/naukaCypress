// declare var require: any
const { defineConfig } = require('cypress')
//Verify download import
const { isFileExist, findFiles } = require("cy-verify-downloads");
//Excel requirements
const xlsx = require("node-xlsx").default;
const fs = require("fs"); // for file
const path = require("path"); // for file path
//mySQL requirements
const mysql = require("mysql");
//Faker
const { faker } = require("@faker-js/faker");

module.exports = defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: "http://uitestingplayground.com",
    setupNodeEvents(on, config) {
      //Verify download import
      on("task", { isFileExist, findFiles });
      //--------------------
      //Excel implementation
      on("task", {
        parseXlsx({ filePath }) {
          return new Promise((resolve, reject) => {
            try {
              const jsonData = xlsx.parse(fs.readFileSync(filePath));
              resolve(jsonData);
            } catch (e) {
              reject(e);
            }
          });
        },
      });
      //------------------
      //mySQL Implementation & Faker
      on("task", {
        queryDb: (query) => {
          return queryTestDb(query, config);
        },
      });
      //--------------------
      //---------------------
      //Faker
      on("task", {
        freshUser() {
          let user = {
            username: faker.name.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            registeredAt: faker.date.past(),
            vehicle: faker.vehicle.vehicle(),
          };
          return user;
        },
      });
      //--------
    },

  },
  env: {
    demoVar: "Hello from the Cypress.Config.Ts",
    demoQA: "https://demoqa.com",
    theInternet: "https://the-internet.herokuapp.com",
    saucedemo: "https://www.saucedemo.com/",
    palindromUrl: "https://bartekkustra.github.io/luczniczqa/task-1/",
    google: "https://www.google.com",
    solidJobs: "https://solid.jobs/offers/it",
    //https://www.globalsqa.com/angularjs-protractor-practice-site/
    Angular: "https://www.globalsqa.com",
    db: {
      host: "root",
      user: "twozniak",
      password: "",
      database: "cypressTest",
    },
    chromeWebSecurity: false,
    "reporter": "junit",
    "reporterOptions": {
      "mochaFile": "results/test-results.xml",
      "testCaseSwitchClassnameAndName": false
    },
  }
})
function queryTestDb(query, config) {
  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection(config.env.db);
  // start connection to db
  connection.connect();
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      else {
        connection.end();
        // console.log(results)
        return resolve(results);
      }
    });
  });
}

