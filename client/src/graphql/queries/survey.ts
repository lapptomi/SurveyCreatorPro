/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

const SURVEY_FIELDS = gql`
  fragment SurveyFields on Survey {
    id
    title
    description
    questions {
      questionNumber
      question
    }
    private
  }
`;

export const CREATE_SURVEY = gql`
  ${SURVEY_FIELDS}
  mutation addSurvey(
    $title: String!,
    $description: String!,
    $questions: [QuestionInput!]!,
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

export const GET_ALL_SURVEYS = gql`
  ${SURVEY_FIELDS}
  query {
    allSurveys {
      ...SurveyFields
    }
  }
`;

export const FIND_SURVEY_BY_ID = gql`
  ${SURVEY_FIELDS}
  query findSurvey($surveyId: ID!) {
    findSurvey(surveyId: $surveyId) {
      ...SurveyFields
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
