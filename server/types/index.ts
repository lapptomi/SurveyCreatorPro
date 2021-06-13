export interface IUser {
  id: number;
  email: string;
  password: string;
}

export interface ISurvey {
  id?: number;
  title: string;
  description: string;
  questions: Array<string>;
  private: boolean;
  answers?: Array<boolean>; // these will change in future
  results?: Array<string>;
}

export interface IToken {
  id: string;
  token: string;
}

export type NewUser = Omit<IUser, 'id'>;

export type NewSurvey = Omit<ISurvey, 'id'>;

export type SafeUser = Omit<IUser, 'id' | 'password'>;
