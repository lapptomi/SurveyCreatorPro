export interface User {
  id: number;
  email: string;
  password: string;
}

export type NewUser = Omit<User, 'id'>;

export interface Survey {
  id?: number;
  title: string;
  description: string;
  private: boolean;
  questions: Array<string>;
  answers?: Array<number>; // these will change in future
  results?: Array<string>;
}

export interface Question {
  title: string;
  answer: number;
}

export type NewSurvey = Omit<Survey, 'id'>;

export type SafeUser = Omit<User, 'id' | 'password'>;