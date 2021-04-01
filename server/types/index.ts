export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  gender: Gender;
}

export type NewUser = Omit<User, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Survey {
  id: number;
  title: string;
  description: string;
  questions: Array<string>;
  private: boolean;
  answers?: Array<boolean>; // these will change in future
  results?: Array<string>;
}

export type NewSurvey = Omit<Survey, 'id'>;

export type SafeUser = Omit<User, 'id' | 'password'>;
