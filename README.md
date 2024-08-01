# Daniels Summer School 2024 - Cypress project

This Cypress automated test framework is designed to ensure the quality and reliability of essential https://coe-webstore.tdlbox.com Desktop online store functionalities through automated testing procedures. These test does not support mobile. It is part of the TDL TestDevLab Summer challenge bootcamp.

Full test plan can be found here: https://tdlschool.atlassian.net/browse/TSS22N-265

## Project setup

- navigate to project root directory
- run `npm install` to install dependencies
- by using template file in the root directory `cypress.env.json.template` create a copy of it named `cypress.env.json` in the project root and replace "INSERT_YOUR_EMAIL" and "INSERT_YOUR_PASSWORD" with pre-created test user email and password
- run `npm run cypress-open` or `npm run cypress-run` (for headless test execution)

## Quick tips

- To quickly format all code in the repo run `npm run format`
- To quickly delete all mochawesome reports run `report-cleanup`
- To run a single test file run `npx cypress run --spec "cypress/e2e/coe-webstore/complete_jorney.cy.js"`
