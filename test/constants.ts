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
  questions: [
    { questionNumber: 0, question: 'question1' },
    { questionNumber: 1, question: 'question2' },
    { questionNumber: 2, question: 'question3' }
  ],
  private: true,
  responses: []
}
