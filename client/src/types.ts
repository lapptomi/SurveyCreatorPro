export interface User {
  id: number;
  username: string;
  password: string;
}


export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}