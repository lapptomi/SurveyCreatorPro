/// <reference types="cypress" />

import { Gender, NewUser } from "../../../server/types";

// @ts-check

describe('Sign up', function() {

  beforeEach(function() {
    cy.request('GET', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('succeeds with valid credentials', function() {
    cy.contains('Sign Up').click()
    cy.get('#email').type('testemail@gmail.com')
    cy.get('#password').type('testpassword')
    cy.contains('I agree to the terms and something...').click()
    
    cy.get('#signupbutton').click()
      .then(() => {
        cy.wait(4000)
        cy.contains('Log out')
        cy.contains('Profile')
        cy.contains('Create Survey')
        cy.contains('Browse Surveys')
      })
  })

  it('fails if non unique email given', function() {
    const testUser: NewUser = {
      email: 'testemail@gmail.com',
      password: "testpassword",
      gender: Gender.Other,
    }
    cy.request('POST', 'http://localhost:3001/api/users/', testUser)

    cy.contains('Sign Up').click()
    cy.get('#email').type('testemail@gmail.com')
    cy.get('#password').type('testpassword')
    cy.contains('I agree to the terms and something...').click()
    cy.get('#signupbutton').click()

    cy.on('window:alert', (str) => {
      cy.wait(4000)
      expect(str).to.eq('Error creating user, try again with valid credentials')
    })
  })

});
