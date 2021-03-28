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

export interface NewSurvey {
  id?: number;
  title: string;
  description: string;
  questions?: Array<string>;
  answers?: Array<boolean>; // these will change in future
  results?: Array<string>;
}
