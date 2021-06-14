/// <reference types="cypress" />
import { NewUser } from "../../../server/types";

// @ts-check
describe('When logged in', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:4000/api/testing/reset')

    // creating user for testing
    const testUser: NewUser = {
      email: 'testemail@gmail.com',
      password: "testpassword",
    }

    cy.visit('http://localhost:3000')

    // Logging in with created user
    cy.contains('Log in').click()
    cy.get('#email').type(testUser.email)
    cy.get('#password').type(testUser.password)
    cy.contains('Login').click()
  })

  it('user can log out', function() {
    cy.contains('Log out').click()
    cy.contains('Log in')
    cy.contains('Sign Up')
  })
});
