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
  questions: Array<IQuestion>;
  private: boolean;
}

export interface IQuestion {
  questionNumber: number;
  question: string;
}

export type NewSurvey = Omit<ISurvey, 'id'>;

export type SafeUser = Omit<IUser, 'id' | 'password'>;

export interface Answer {
  questionNumber: number;
  question: string;
  answer: 1 | 2 | 3 | 4 | 5;
}
