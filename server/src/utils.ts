/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewUser, NewSurvey, IQuestion } from '../types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseEmail = (email: string): string => {
  if (!email || !isString(email) || email.length < 6) {
    throw new Error('Incorrect or missing email');
  }
  return email;
};

const parsePassword = (password: string): string => {
  if (!password || !isString(password) || password.length < 4) {
    throw new Error('Incorrect or missing password');
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
    throw new Error('Incorrect or missing title');
  }
  return title;
};

const parseDescription = (description: string): string => {
  if (!description || !isString(description) || description.length < 4) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseQuestions = (questions: Array<IQuestion>): Array<IQuestion> => {
  // Check that question is valid
  Object.values(questions).forEach((object) => {
    // Parse title
    parseTitle(object.question);

    // Parse answer options
    Object.values(object.answerOptions).forEach((option) => {
      if (!option || !isString(option) || option.length < 4) {
        throw new Error('Incorrect or missing option');
      }
    });
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
