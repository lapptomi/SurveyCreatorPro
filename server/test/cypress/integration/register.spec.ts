/// <reference types="cypress" />
import { addUserMutation, allUsersQuery, BASE_URL, testUser } from "../../test-utils";

describe('Sign up', function() {

  beforeEach(function() {
    cy.request('POST', `${BASE_URL}/api/testing/reset`)

    cy.visit(BASE_URL)

    // Open register page
    cy.get('#topnav-signup-button').click()
  });

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
  });

  it('fails if email is not given', function () {
    // Try sending request to the server with invalid email
    cy.graphQlRequest(addUserMutation('', testUser.password)).then((result) => {
      expect(result.body.data.addUser).to.be.null
      expect(result.body.errors[0].message).to.contains('Incorrect or missing email')
    })

    // Confirm that user was not added to database
    cy.graphQlRequest(allUsersQuery).then((result) => {
      const users = result.body.data.allUsers
      expect(users.length).to.eq(0)
    })
  });

  it('fails if password is not given', function () {
    // Try sending request to the server with invalid password
    cy.graphQlRequest(addUserMutation(testUser.email, '')).then((result) => {
      expect(result.body.data.addUser).to.be.null
      expect(result.body.errors[0].message).to.contains('Incorrect or missing password')
    })

    // Confirm that user was not added to database
    cy.graphQlRequest(allUsersQuery).then((result) => {
      const users = result.body.data.allUsers
      expect(users.length).to.eq(0)
    })
  });

  it('fails if password and email is not given', function () {
    // Try sending request to the server with invalid email and password
    cy.graphQlRequest(addUserMutation('', '')).then((result) => {
      expect(result.body.data.addUser).to.be.null
    })

    // Confirm that user was not added to database
    cy.graphQlRequest(allUsersQuery).then((result) => {
      const users = result.body.data.allUsers
      expect(users.length).to.eq(0)
    })
  });

  it('fails if non unique email given', function() {
    // Create user to the server
    cy.graphQlRequest(addUserMutation(testUser.email, testUser.password))

    // Try to create a user with the same email as above
    cy.get('#register-form-email-field').type(testUser.email)
    cy.get('#register-form-password-field').type(testUser.password)
    cy.get('#register-form-confirm-password-field').type(testUser.password)

    cy.get('.register-form-accept-terms-checkbox').click()
    cy.get('#register-form-signup-button').click()

    cy.contains('Error creating new user')
    cy.contains('Email is already taken')
  });
});
