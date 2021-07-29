/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import {
  NewUser, NewSurvey, IQuestion, IAnswer, ISurvey,
} from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseEmail = (email: string): string => {
  if (!email || !isString(email) || email.length < 6) {
    throw new Error(`Incorrect or missing email: ${email}`);
  }
  return email;
};

const parseId = (id: string): string => {
  if (!id || !isString(id) || id.length < 6) {
    throw new Error(`Incorrect or missing id: ${id}`);
  }
  return id;
};

const parsePassword = async (password: string): Promise<string> => {
  if (!password || !isString(password) || password.length < 4) {
    throw new Error(`Incorrect or missing password: ${password}`);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  return passwordHash;
};

export const toNewUser = async (object: NewUser): Promise<NewUser> => {
  return {
    email: parseEmail(object.email),
    password: await parsePassword(object.password),
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

export const parseQuestions = (questions: Array<any>): Array<IQuestion> => {
  if (questions.length < 2) {
    throw new Error('Survey must have atleast 2 questions');
  }

  questions.forEach((question) => {
    if (!question || !isString(question) || question.length < 4 || question.length > 50) {
      throw new Error(`Incorrect or missing question: ${question as string}`);
    }
  });

  // Add questionNumber to every question
  return questions.map((question: string, index) => ({ questionNumber: index, question }));
};

export const parseAnswers = (answers: Array<IAnswer>): Array<IAnswer> => {
  answers.forEach((answer) => {
    if (Number.isNaN(answer.questionNumber)) {
      throw new Error(`Incorrect or missing questionNumber: ${answer.questionNumber}`);
    }
    if (!answer.question
      || !isString(answer.question)
      || answer.question.length < 4
      || answer.question.length > 50) {
      throw new Error(`Incorrect or missing question: ${answer.question}`);
    }
  });

  return answers;
};

export const toNewSurvey = (object: NewSurvey): ISurvey => {
  return {
    creatorId: parseId(object.creatorId),
    title: parseTitle(object.title),
    description: parseDescription(object.description),
    questions: parseQuestions(object.questions),
    private: object.private,
    responses: object.responses,
  };
};
