/// <reference types="cypress" />
import { Gender, NewUser } from "../../../server/types"

describe('Login', function() {
  // @ts-check
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
  })
  

  it('front page can be opened', function() {
    cy.contains('Log in')
    cy.contains('SurveyCreatorPro')
  });

  it('succeeds with correct credentials', function() {
    cy.contains('Log in').click()
    cy.get('#email').type('testemail@gmail.com')
    cy.get('#password').type('testpassword')
    cy.contains('Login').click()
    cy.contains('Log out')
    cy.contains('Profile')
  })

  it('fails with wrong email', function() {
    cy.contains('Log in').click()
    cy.get('#email').type('wrongemail@gmail.com')
    cy.get('#password').type('testpassword')
    cy.contains('Login').click()

    cy.contains('Log in to your account')
    cy.on('window:alert', (str) => {
      expect(str).to.eq('Wrong credentials, please try again')
    })
  })

  it('fails with wrong password', function() {
    cy.contains('Log in').click()
    cy.get('#email').type('testemail@gmail.com')
    cy.get('#password').type('wrongpassword')
    cy.contains('Login').click()

    cy.contains('Log in to your account')
    cy.on('window:alert', (str) => {
      expect(str).to.eq('Wrong credentials, please try again')
    })
  })

  it('fails if email is not given', function() {
    cy.contains('Log in').click()
    cy.get('#password').type('wrongpassword')
    cy.contains('Login').click()

    cy.contains('Log in to your account')
    cy.on('window:alert', (str) => {
      expect(str).to.eq('Wrong credentials, please try again')
    })
  })

  it('fails if password is not given', function() {
    cy.contains('Log in').click()
    cy.get('#email').type('testemail@gmail.com')
    cy.contains('Login').click()

    cy.contains('Log in to your account')
    cy.on('window:alert', (str) => {
      expect(str).to.eq('Wrong credentials, please try again')
    })
  })
});