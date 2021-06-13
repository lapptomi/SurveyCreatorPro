/// <reference types="cypress" />
import { Gender, NewUser } from "../../../server/types";

// @ts-check
describe('When logged in', function() {

  beforeEach(function() {
    cy.request('GET', 'http://localhost:3001/api/testing/reset')

    // creating user for testing
    const testUser: NewUser = {
      email: 'testemail@gmail.com',
      password: "testpassword",
      gender: Gender.Other,
    }

    cy.request('POST', 'http://localhost:3001/api/users/', testUser)
    cy.visit('http://localhost:3000')

    // Logging in with created user
    cy.contains('Log in').click()
    cy.get('#email').type('testemail@gmail.com')
    cy.get('#password').type('testpassword')
    cy.contains('Login').click()
  })

  it('user can log out', function() {
    cy.contains('Log out').click()
    cy.contains('Log in')
    cy.contains('Sign Up')
  })
});
