// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { BASE_URL } from "../../test-utils"

Cypress.Commands.add('graphQlRequest', (query) => {
  cy.request({
    url: `${BASE_URL}/graphql`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      query: query
    },
    failOnStatusCode: false,
  })
})

declare global {
  namespace Cypress {
    interface Chainable {
      graphQlRequest(query: string): Promise<any>,
    }
  }
}