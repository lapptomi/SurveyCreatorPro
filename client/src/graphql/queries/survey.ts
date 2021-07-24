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
