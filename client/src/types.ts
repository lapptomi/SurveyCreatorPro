export interface IUser {
  id: number;
  email: string;
  password: string;
}

export type NewUser = Omit<IUser, 'id'>;

export interface ISurvey {
  id?: string;
  title: string;
  description: string;
  questions: Array<string>;
  private: boolean;
}

export type NewSurvey = Omit<ISurvey, 'id'>;

export type SafeUser = Omit<IUser, 'id' | 'password'>;

export interface Answer {
  row: number;
  question: string;
  answerOption: string;
}
