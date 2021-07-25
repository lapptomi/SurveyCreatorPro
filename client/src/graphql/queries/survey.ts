/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const CREATE_SURVEY = gql`
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
      id
      title
      description
      questions
      private
    }
  }
`;

// Fragment for all survey fields
const SURVEY_FIELDS = gql`
  fragment SurveyFields on Survey {
    id
    title
    description
    questions
    private
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
