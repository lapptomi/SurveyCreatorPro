export interface IUser {
  id: string;
  email: string;
  password: string;
}

export interface IQuestion {
  questionNumber: number;
  question: string;
}

export interface ISurvey {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  questions: Array<IQuestion>;
  private: boolean;
  responses?: Array<Response>
}

export interface Response {
  respondent: string | IUser;
  surveyId?: string;
  answers: Array<Answer>;
}

interface Answer {
  questionNumber: number;
  question: string;
  answer: 1 | 2 | 3 | 4 | 5;
}

export interface IToken {
  id: string;
  token: string;
}

export interface ApolloContext {
  currentUser: IUser;
}

export type NewUser = Omit<IUser, 'id'>;

export type NewSurvey = Omit<ISurvey, 'id'>;

export type SafeUser = Omit<IUser, 'id' | 'password'>;

export enum SchemaName {
  User = 'User',
  Survey = 'Survey',
  Question = 'Question',
  Response = 'Response',
}
