export interface IUser {
  id: string;
  email: string;
  password: string;
}

export interface ISurvey {
  id?: string;
  title: string;
  description: string;
  questions: Array<string>;
  private: boolean;
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
