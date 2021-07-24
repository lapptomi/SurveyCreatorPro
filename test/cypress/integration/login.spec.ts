/// <reference types="cypress" />
import { NewUser } from "../../../server/src/types"


const testUser: NewUser = {
  email: 'testemail@gmail.com',
  password: "testpassword",
}

describe('Login', function() {
  // @ts-check
  beforeEach(function() {
    cy.request('POST', 'http://localhost:4000/api/testing/reset')

    cy.visit('http://localhost:3000')

    // creating user for testing login
    cy.get('#topnav-signup-button').click()
    cy.get('#register-form-email-field').type(testUser.email)
    cy.get('#register-form-password-field').type(testUser.password)
    cy.get('#register-form-confirm-password-field').type(testUser.password)

    cy.get('.register-form-accept-terms-checkbox').click()
    cy.wait(1000)

    cy.get('#register-form-signup-button').click()
      .then(() => {
        cy.contains('Log out')
        cy.contains('Profile')
        cy.contains('Create Survey')
        cy.contains('Browse Surveys')
      })

    cy.contains('Log out').click()
    cy.wait(1000)

    cy.get('#topnav-login-button').click()
  });
  

  it('front page can be opened', function() {
    cy.contains('SurveyCreatorPro').click()
    cy.contains('Get Started')
  });

  it('succeeds with correct credentials', function() {
    cy.get('#login-form-email-field').type(testUser.email)
    cy.get('#login-form-password-field').type(testUser.password)
    cy.get('#login-form-login-button').click()
    
    cy.contains('Log out')
    cy.contains('Profile')
  })

  it('fails with wrong email', function() {
    cy.get('#login-form-email-field').type('worngemail@random.com')
    cy.get('#login-form-password-field').type(testUser.password)
    cy.get('#login-form-login-button').click()

    cy.wait(1000)
    cy.contains('Log in to your account')
    
    cy.on('window:alert', (str) => {
      expect(str).to.eq('User not found')
    })
  })

  it('fails with wrong password', function() {
    cy.get('#login-form-email-field').type(testUser.email)
    cy.get('#login-form-password-field').type('wrongpassword')
    cy.get('#login-form-login-button').click()

    cy.wait(1000)
    cy.contains('Log in to your account')

    cy.on('window:alert', (str) => {
      expect(str).to.eq('Invalid username or password')
    })
  })

  it('fails if email is not given', function() {    
    cy.get('#login-form-password-field').type('wrongpassword')
    cy.get('#login-form-login-button').should('be.disabled');

    cy.contains('Log in to your account')
  })

  it('fails if password is not given', function() {
    cy.get('#login-form-email-field').type(testUser.email)
    cy.get('#login-form-login-button').should('be.disabled');

    cy.contains('Log in to your account')
  })
});
