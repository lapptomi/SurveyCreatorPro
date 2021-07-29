/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

const SURVEY_FIELDS = gql`
  fragment SurveyFields on Survey {
    id
    title
    description
    private
  }
`;

export const CREATE_SURVEY = gql`
  ${SURVEY_FIELDS}
  mutation addSurvey(
    $title: String!,
    $description: String!,
    $questions: [String!]!,
    $private: Boolean!
  ) {
    addSurvey(
      title: $title,
      description: $description,
      questions: $questions,
      private: $private
    ) {
      ...SurveyFields
    }
  }
`;

export const GET_SURVEYS_OF_CURRENT_USER = gql`
  ${SURVEY_FIELDS}
  query allSurveys($ofCurrentUser: Boolean) {
    allSurveys(ofCurrentUser: $ofCurrentUser) {
      ...SurveyFields
      questions {
        question
        questionNumber
      }
      responses {
        respondent
        answers {
          questionNumber
          question
          answer
        }
      }
    }
  }
`;

export const GET_ALL_SURVEYS = gql`
  ${SURVEY_FIELDS}
  query allSurveys($private: Boolean) {
    allSurveys(private: $private) {
      ...SurveyFields
    }
  }
`;

export const FIND_SURVEY_BY_ID = gql`
  ${SURVEY_FIELDS}
  query findSurvey($surveyId: ID!) {
    findSurvey(surveyId: $surveyId) {
      ...SurveyFields
      questions {
        questionNumber
        question
      }
    }
  }
`;

export const ADD_RESPONSE = gql`
  ${SURVEY_FIELDS}
  mutation addResponse($surveyId: ID!, $answers: [AnswerInput!]!) {
    addResponse (
      surveyId: $surveyId
      answers: $answers
    ) {
      ...SurveyFields
      responses {
        respondent
        answers {
          questionNumber
          question
        }
      }
    }
  }
`;
