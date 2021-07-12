export interface User {
  id: number;
  email: string;
  password: string;
}

export type NewUser = Omit<User, 'id'>;

export interface ISurvey {
  id?: number;
  title: string;
  description: string;
  questions: Array<IQuestion>;
  private: boolean;
}

export interface IQuestion {
  question: string;
  choises: Array<string>;
}

export type NewSurvey = Omit<ISurvey, 'id'>;

export type SafeUser = Omit<User, 'id' | 'password'>;