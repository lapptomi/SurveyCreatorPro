import { NewSurvey, NewUser } from "../src/types";

export const BASE_URL = 'http://localhost:4000';

// Dummy objects for testing
export const testUser: NewUser = {
  email: 'testemail@gmail.com',
  password: "testpassword",
}

export const testUser2: NewUser = {
  email: 'testemail2@gmail.com',
  password: "testpassword2",
}

export const testSurvey: Omit<NewSurvey, 'creatorId'> = {
  title: 'test-title',
  description: 'test-description',
  questions: ['question1', 'question2', 'question3'],
  private: false,
  responses: []
}

// GraphQL Queries
export const addUserMutation = (email: string, password: string): string => {
  return `
    mutation addUser {
      addUser(email: "${email}", password: "${password}") {
        id
        email
        password
      }
    }
  `
}

export const loginMutation = (email: string, password: string): string => {
  return `
    mutation login {
      login(email: "${email}", password: "${password}") {
        id
        token
      }
    }
  `
}

export const allUsersQuery = `
  query allUsers {
    allUsers {
      id
      email
      password
    }
  }
`
