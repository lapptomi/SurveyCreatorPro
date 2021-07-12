export interface IUser {
  id: string;
  email: string;
  password: string;
}

export interface IQuestion {
  id?: string;
  question: string;
  answerOptions: Array<string>;
}

export interface ISurvey {
  id?: string;
  title: string;
  description: string;
  questions: Array<IQuestion>;
  private: boolean;
}

export interface IToken {
  id: string;
  token: string;
}

export type NewUser = Omit<IUser, 'id'>;

export type NewSurvey = Omit<ISurvey, 'id'>;

export type SafeUser = Omit<IUser, 'id' | 'password'>;
