/// <reference types="cypress" />
import { NewSurvey, NewUser } from "../../../server/src/types"


const testUser: NewUser = {
  email: 'testemail@gmail.com',
  password: "testpassword",
}

const testSurvey: NewSurvey = {
  title: 'test-title',
  description: 'test-description',
  questions: ['question1', 'question2'],
  private: true,
}

describe('Survey', function() {
  // @ts-check
  beforeEach(function() {
    cy.request('POST', 'http://localhost:4000/api/testing/reset')

    cy.visit('http://localhost:3000')

    // create user for testing
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

    cy.get('#topnav-create-survey-button').click()
  });
  

  it('create survey page can be opened', function() {
    cy.contains('Create New Survey')
    cy.contains('Survey title')
    cy.contains('Survey description')
  });

  it('can be created with valid information', function() {
    cy.get('#survey-form-title-input').type(testSurvey.title)
    cy.get('#survey-form-description-input').type(testSurvey.description)

    cy.get('#survey-form-question-input').type(testSurvey.questions[0])
    cy.get('#survey-form-add-question-button').click()
    cy.contains(testSurvey.questions[0])
    cy.wait(1000)

    cy.get('#survey-form-question-input').type(testSurvey.questions[1])
    cy.get('#survey-form-add-question-button').click()
    cy.contains(testSurvey.questions[1])

    cy.get('.survey-form-yes-radio').click()

    cy.get('#survey-form-create-button').click()

    /*
      Change later to better checking that survey has been created
    */
    cy.contains('What is SurveyCreatorPro?')
  });

  it('cannot be created without adding questions', function() {
    cy.get('#survey-form-title-input').type(testSurvey.title)
    cy.get('#survey-form-description-input').type(testSurvey.description)

    cy.get('.survey-form-yes-radio').click()

    cy.get('#survey-form-create-button').should('be.disabled');
  });

  it('cannot be created without adding title', function() {
    // cy.get('#survey-form-title-input').type(testSurvey.title)
    cy.get('#survey-form-description-input').type(testSurvey.description)

    cy.get('#survey-form-question-input').type(testSurvey.questions[0])
    cy.get('#survey-form-add-question-button').click()
    cy.contains(testSurvey.questions[0])
    cy.wait(1000)

    cy.get('#survey-form-question-input').type(testSurvey.questions[1])
    cy.get('#survey-form-add-question-button').click()
    cy.contains(testSurvey.questions[1])

    cy.get('.survey-form-yes-radio').click()

    cy.get('#survey-form-create-button').should('be.disabled');
  });

  it('cannot be created without adding description', function() {
    cy.get('#survey-form-title-input').type(testSurvey.title)
    // cy.get('#survey-form-description-input').type(testSurvey.description)

    cy.get('#survey-form-question-input').type(testSurvey.questions[0])
    cy.get('#survey-form-add-question-button').click()
    cy.contains(testSurvey.questions[0])
    cy.wait(1000)

    cy.get('#survey-form-question-input').type(testSurvey.questions[1])
    cy.get('#survey-form-add-question-button').click()
    cy.contains(testSurvey.questions[1])

    cy.get('.survey-form-yes-radio').click()

    cy.get('#survey-form-create-button').should('be.disabled');
  });

});
