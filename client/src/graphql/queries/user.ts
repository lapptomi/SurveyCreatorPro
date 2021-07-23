import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query {
    allUsers  {
      id
      email
      password
    }
  }
`;

export const CREATE_NEW_USER = gql`
  mutation addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      email
      password
    }
  }
`;
