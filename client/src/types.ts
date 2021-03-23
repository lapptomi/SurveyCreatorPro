export interface User {
  id?: number;
  email: string;
  username: string;
  password: string;
  gender: Gender;
}


export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}