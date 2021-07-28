/// <reference types="cypress" />

import { BASE_URL, testUser } from "../../constants";

// @ts-check

describe('Sign up', function() {

  beforeEach(function() {
    cy.request('POST', `${BASE_URL}/api/testing/reset`)

    cy.visit('http://localhost:3000')

    // Open sign up page
    cy.get('#topnav-signup-button').click()

    cy.contains('Something went wrong or the page does not exist...').should('not.exist')
    cy.contains('404 - Page Not Found :(').should('not.exist')
  })

  it('succeeds with valid credentials', function() {
    cy.get('#register-form-email-field').type(testUser.email)
    cy.get('#register-form-password-field').type(testUser.password)
    cy.get('#register-form-confirm-password-field').type(testUser.password)

    cy.get('.register-form-accept-terms-checkbox').click()
    
    cy.get('#register-form-signup-button').click()
      .then(() => {
        cy.contains('Log out')
        cy.contains('Profile')
        cy.contains('Create Survey')
        cy.contains('Browse Surveys')
      })
  })

  it('fails if non unique email given', function() {
    // Create new user with unique email
    cy.get('#register-form-email-field').type(testUser.email)
    cy.get('#register-form-password-field').type(testUser.password)
    cy.get('#register-form-confirm-password-field').type(testUser.password)

    cy.get('.register-form-accept-terms-checkbox').click()
    
    cy.get('#register-form-signup-button').click()
      .then(() => {
        cy.contains('Log out')
        cy.contains('Profile')
        cy.contains('Create Survey')
        cy.contains('Browse Surveys')
        cy.get('#topnav-logout-button').click() // Log out the current user
      })

    // try to create another account with the same email
    cy.get('#topnav-signup-button').click()

    cy.get('#register-form-email-field').type(testUser.email)
    cy.get('#register-form-password-field').type(testUser.password)
    cy.get('#register-form-confirm-password-field').type(testUser.password)
    cy.get('.register-form-accept-terms-checkbox').click()
    
    cy.get('#register-form-signup-button').click()
    cy.contains('Create new account')
  })

});
