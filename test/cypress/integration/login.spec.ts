/// <reference types="cypress" />
import { addUserMutation, BASE_URL, loginMutation, testUser } from "../../test-utils";


describe('Login', function() {

  beforeEach(function() {
    cy.request('POST', `${BASE_URL}/api/testing/reset`)

    // creating user for testing login
    cy.graphQlRequest(addUserMutation(testUser.email, testUser.password))

    cy.visit('http://localhost:3000')

    // Open login page
    cy.get('#topnav-login-button').click()
  });
  

  it('login page can be opened', function() {
    cy.contains('SurveyCreatorPro')
    cy.contains('Log in to your account')
  });

  it('succeeds with correct credentials', function() {
    // Try on the client
    cy.get('#login-form-email-field').type(testUser.email)
    cy.get('#login-form-password-field').type(testUser.password)
    cy.get('#login-form-login-button').click()
    
    cy.contains('Log out')
    cy.contains('Profile')

    // Try sending request to the server
    cy.graphQlRequest(loginMutation(testUser.email, testUser.password)).then((response) => {
      expect(response.body.errors).to.be.undefined
      expect(response.body.data.login.token).to.not.be.undefined
    })
  });

  it('fails with wrong email', function() {
    // Try on the client
    cy.get('#login-form-email-field').type('worngemail@random.com')
    cy.get('#login-form-password-field').type(testUser.password)
    cy.get('#login-form-login-button').click()

    cy.contains('Error logging in')
    cy.contains('Invalid username or password')

    // Try sending request to the server
    cy.graphQlRequest(loginMutation('WRONG EMAIL', testUser.password)).then((response) => {
      expect(response.body.errors[0].message).to.eq('Invalid username or password')
    })
  });

  it('fails with wrong password', function() {
    // Try on the client
    cy.get('#login-form-email-field').type(testUser.email)
    cy.get('#login-form-password-field').type('wrongpassword')
    cy.get('#login-form-login-button').click()

    cy.contains('Error logging in')
    cy.contains('Invalid username or password')

    // Try sending request to the server
    cy.graphQlRequest(loginMutation(testUser.email, 'WRONG PASSWORD')).then((response) => {
      expect(response.body.errors[0].message).to.eq('Invalid username or password')
    })
  });

  it('fails if email is not given', function() {    
    // Try on the client
    cy.get('#login-form-password-field').type('wrongpassword')
    cy.get('#login-form-login-button').should('be.disabled');
    
    cy.contains('Log in to your account')

    // Try sending request to the server
    cy.graphQlRequest(loginMutation('', testUser.email)).then((response) => {
      expect(response.body.errors[0].message).to.eq('Invalid username or password')
    })
  });

  it('fails if password is not given', function() {
    // Try on the client
    cy.get('#login-form-email-field').type(testUser.email)
    cy.get('#login-form-login-button').should('be.disabled');

    cy.contains('Log in to your account')

    // Try sending request to the server
    cy.graphQlRequest(loginMutation(testUser.email, '')).then((response) => {
      expect(response.body.errors[0].message).to.eq('Invalid username or password')
    })
  });

});
