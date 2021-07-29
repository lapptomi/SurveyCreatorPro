/// <reference types="cypress" />
import { BASE_URL, testSurvey, testUser, testUser2 } from "../../test-utils";

describe('Browsing surveys', function() {

  beforeEach(function() {
    cy.request('POST', `${BASE_URL}/api/testing/reset`)

    cy.visit('http://localhost:3000')

    // create user for testing and login before each test
    cy.get('#topnav-signup-button').click()
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

    cy.get('#topnav-browse-surveys-button').click()

    cy.contains('Something went wrong or the page does not exist...').should('not.exist')
    cy.contains('404 - Page Not Found :(').should('not.exist')
  });
  

  it('page can be opened', function() {
    cy.contains('Browse Public Surveys')
    cy.contains('List of public surveys')
  });

  it('shows only surveys that are public', function() {
    cy.get('#topnav-create-survey-button').click()

    cy.get('#survey-form-title-input').type(testSurvey.title)
    cy.get('#survey-form-description-input').type(testSurvey.description)

    for (let i = 0; i < testSurvey.questions.length; i++) {
      cy.get('#survey-form-question-input').type(testSurvey.questions[i])
      cy.get('#survey-form-add-question-button').click()
      cy.contains(testSurvey.questions[i])
    }
    
    cy.get('.survey-form-no-radio').click()
    cy.get('#survey-form-create-button').click()

    cy.wait(2000)
    cy.get('#topnav-browse-surveys-button').click()

    cy.contains(`Title: ${testSurvey.title}`)
    cy.contains(`Survey description: ${testSurvey.description}`)
    cy.contains('No surveys addded yet...').should('not.exist')
  })

});


describe('Creating a survey', function() {

  beforeEach(function() {
    cy.request('POST', `${BASE_URL}/api/testing/reset`)

    cy.visit('http://localhost:3000')

    // create user for testing before each test
    cy.get('#topnav-signup-button').click()
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

    cy.get('#topnav-create-survey-button').click()

    cy.contains('Something went wrong or the page does not exist...').should('not.exist')
    cy.contains('404 - Page Not Found :(').should('not.exist')
  });
  

  it('page can be opened', function() {
    cy.contains('Create New Survey')
    cy.contains('Survey title')
    cy.contains('Survey description')
  });

  it('can be done with valid information', function() {
    cy.get('#survey-form-title-input').type(testSurvey.title)
    cy.get('#survey-form-description-input').type(testSurvey.description)

    for (let i = 0; i < testSurvey.questions.length; i++) {
      cy.get('#survey-form-question-input').type(testSurvey.questions[i])
      cy.get('#survey-form-add-question-button').click()
      cy.contains(testSurvey.questions[i])
    }

    cy.get('#survey-form-create-button').click()

    cy.contains(`Title: ${testSurvey.title}`)
    cy.contains(`Description: ${testSurvey.description}`)
    cy.contains(`List of survey questions`)
  });

  it('cannot be done without adding questions', function() {
    cy.get('#survey-form-title-input').type(testSurvey.title)
    cy.get('#survey-form-description-input').type(testSurvey.description)

    cy.get('#survey-form-create-button').should('be.disabled');
  });

  it('cannot be done without adding title', function() {
    // cy.get('#survey-form-title-input').type(testSurvey.title)
    cy.get('#survey-form-description-input').type(testSurvey.description)

    for (let i = 0; i < testSurvey.questions.length; i++) {
      cy.get('#survey-form-question-input').type(testSurvey.questions[0])
      cy.get('#survey-form-add-question-button').click()
      cy.contains(testSurvey.questions[0])
    }

    cy.get('#survey-form-create-button').should('be.disabled');
  });

  it('cannot be done without adding description', function() {
    cy.get('#survey-form-title-input').type(testSurvey.title)
    // cy.get('#survey-form-description-input').type(testSurvey.description)

    for (let i = 0; i < testSurvey.questions.length; i++) {
      cy.get('#survey-form-question-input').type(testSurvey.questions[i])
      cy.get('#survey-form-add-question-button').click()
      cy.contains(testSurvey.questions[i])
    }

    cy.get('#survey-form-create-button').should('be.disabled');
  });

  it('cannot be done with less than two questions', function() {
    cy.get('#survey-form-title-input').type(testSurvey.title)
    cy.get('#survey-form-description-input').type(testSurvey.description)

    cy.get('#survey-form-question-input').type(testSurvey.questions[0])
    cy.get('#survey-form-add-question-button').click()
    cy.contains(testSurvey.questions[0])
    

    cy.get('#survey-form-create-button').click()

    cy.contains('Error creating survey')
    cy.contains('Survey must have atleast 2 questions')
  })
});


describe('Answering a survey', function() {
  // @ts-check
  beforeEach(function() {
    cy.request('POST', `${BASE_URL}/api/testing/reset`)

    cy.visit('http://localhost:3000')

    // create user for testing
    cy.get('#topnav-signup-button').click()
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

    cy.get('#topnav-create-survey-button').click()

    // Create a survey
    cy.get('#survey-form-title-input').type(testSurvey.title)
    cy.get('#survey-form-description-input').type(testSurvey.description)

    for (let i = 0; i < testSurvey.questions.length; i++) {
      cy.get('#survey-form-question-input').type(testSurvey.questions[i])
      cy.get('#survey-form-add-question-button').click()
      cy.contains(testSurvey.questions[i])
    }

    cy.get('#survey-form-create-button').click()

    cy.contains(`Title: ${testSurvey.title}`)
    cy.contains(`Description: ${testSurvey.description}`)
    cy.contains(`List of survey questions`)

    cy.contains('Something went wrong or the page does not exist...').should('not.exist')
    cy.contains('404 - Page Not Found :(').should('not.exist')
  });
  

  it('page can be opened', function() {
    cy.contains(`Title: ${testSurvey.title}`)
    cy.contains(`Description: ${testSurvey.description}`)
    cy.contains(`List of survey questions`)
  });

  it('can be done with valid information', function() {
    cy.get('.table-row1-option1').click()
    cy.get('.table-row2-option4').click()
    cy.get('.table-row3-option5').click()
    cy.get('#submit-answer-button').click()

    cy.contains('Browse Public Surveys')
    cy.contains('Click the arrow to answer this survey')
  });

  it('cannot be done without answering all questions', function() {
    cy.get('.table-row1-option1').click()
    cy.get('.table-row2-option4').click()
    //cy.get('.table-row3-option5').click()

    cy.get('#submit-answer-button').should('be.disabled')
    cy.contains('Please answer the questions below by selecting a number between 1 - 5.')
  });


  it('can be done only once per user', function() {
    cy.get('.table-row1-option1').click()
    cy.get('.table-row2-option2').click()
    cy.get('.table-row3-option5').click()
    cy.get('#submit-answer-button').click()
  
    cy.contains('Browse Public Surveys')
    cy.contains('Click the arrow to answer this survey')

    cy.get('.answer-survey-icon').click()

    cy.get('.table-row1-option1').click()
    cy.get('.table-row2-option2').click()
    cy.get('.table-row3-option5').click()
    cy.get('#submit-answer-button').click()
    
    cy.contains('Error answering survey')
    cy.contains('You have already answered this survey')
  });

  it('can be done with different users users', function() {
    cy.get('.table-row1-option1').click()
    cy.get('.table-row2-option2').click()
    cy.get('.table-row3-option5').click()
    cy.get('#submit-answer-button').click()

    cy.contains('Browse Public Surveys')
    cy.contains('Click the arrow to answer this survey')

    cy.get('.answer-survey-icon').click()

    cy.get('.table-row1-option1').click()
    cy.get('.table-row2-option2').click()
    cy.get('.table-row3-option5').click()
    cy.get('#submit-answer-button').click()

    cy.contains('Error answering survey')
    cy.contains('You have already answered this survey')

    // Create and log in as another user
    cy.get('#topnav-logout-button').click()

    cy.get('#topnav-signup-button').click()
    cy.get('#register-form-email-field').type(testUser2.email)
    cy.get('#register-form-password-field').type(testUser2.password)
    cy.get('#register-form-confirm-password-field').type(testUser2.password)

    cy.get('.register-form-accept-terms-checkbox').click()

    cy.get('#register-form-signup-button').click()
      .then(() => {
        cy.contains('Log out')
        cy.contains('Profile')
        cy.contains('Create Survey')
        cy.contains('Browse Surveys')
      })

    // Answer the survey with the second user
    cy.get('#topnav-browse-surveys-button').click()
    cy.get('.answer-survey-icon').click()
    cy.get('.table-row1-option1').click()
    cy.get('.table-row2-option2').click()
    cy.get('.table-row3-option5').click()
    cy.get('#submit-answer-button').click()

    cy.contains('Browse Public Surveys')
    cy.contains('Click the arrow to answer this survey')
  });

});
