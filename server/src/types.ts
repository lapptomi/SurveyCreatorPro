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
  id?: string;
  creatorId: string;
  title: string;
  description: string;
  questions: Array<IQuestion>;
  private: boolean;
  responses: Array<IResponse>
}

export interface IResponse {
  respondent: string;
  surveyId?: string;
  answers: Array<IAnswer>;
}

export interface IAnswer {
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

// Remove id and questions.questionNumber fields
export type NewSurvey = Omit<ISurvey, 'id' | 'questions'> & { questions: Array<string> };

export type SafeUser = Omit<IUser, 'id' | 'password'>;

export enum SchemaName {
  User = 'User',
  Survey = 'Survey',
  Question = 'Question',
  Response = 'Response',
}
