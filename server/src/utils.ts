/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewUser, Gender, NewSurvey } from './types';

const isString = (text: any): text is string => typeof text === 'string' || text instanceof String;

const isGender = (param: any): param is Gender => Object.values(Gender).includes(param);

const parseEmail = (email: string): string => {
  if (!email || !isString(email) || email.length < 4) {
    throw new Error('Incorrect or missing email');
  }
  return email;
};

const parseUsername = (username: string): string => {
  if (!username || !isString(username) || username.length < 4) {
    throw new Error('Incorrect or missing username');
  }
  return username;
};

const parsePassword = (password: string): string => {
  if (!password || !isString(password) || password.length < 4) {
    throw new Error('Incorrect or missing password');
  }
  return password;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

export const toNewUser = (object: NewUser): NewUser => {
  console.log(object);
  return {
    email: parseEmail(object.email),
    username: parseUsername(object.username),
    password: parsePassword(object.password),
    gender: parseGender(object.gender),
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

export const toNewSurvey = (object: NewSurvey): NewSurvey => {
  console.log(object);
  return {
    title: parseTitle(object.title),
    description: parseDescription(object.description),
  };
};
