import { NewSurvey, NewUser } from "../server/src/types";

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

export const testSurvey: NewSurvey = {
  creatorId: 'random-id-123',
  title: 'test-title',
  description: 'test-description',
  questions: ['question1', 'question2', 'question3'],
  private: false,
  responses: []
}
