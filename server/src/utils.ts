/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewUser, NewSurvey } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseEmail = (email: string): string => {
  if (!email || !isString(email) || email.length < 6) {
    throw new Error(`Incorrect or missing email: ${email}`);
  }
  return email;
};

const parsePassword = (password: string): string => {
  if (!password || !isString(password) || password.length < 4) {
    throw new Error(`Incorrect or missing password: ${password}`);
  }
  return password;
};

export const toNewUser = (object: NewUser): NewUser => {
  return {
    email: parseEmail(object.email),
    password: parsePassword(object.password),
  };
};

const parseTitle = (title: string): string => {
  if (!title || !isString(title) || title.length < 4) {
    throw new Error(`Incorrect or missing title: ${title}`);
  }
  return title;
};

const parseDescription = (description: string): string => {
  if (!description || !isString(description) || description.length < 4) {
    throw new Error(`Incorrect or missing description: ${description}`);
  }
  return description;
};

const parseQuestions = (questions: Array<string>): Array<string> => {
  questions.forEach((question: string) => {
    if (!question || !isString(question) || question.length < 4 || question.length > 50) {
      throw new Error(`Incorrect or missing question: ${question}`);
    }
  });

  return questions;
};

export const toNewSurvey = (object: NewSurvey): NewSurvey => {
  return {
    title: parseTitle(object.title),
    description: parseDescription(object.description),
    questions: parseQuestions(object.questions),
    private: object.private,
  };
};
