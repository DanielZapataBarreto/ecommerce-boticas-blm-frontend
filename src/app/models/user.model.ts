export interface User {
  name: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  dni: string;
  address: Object;
  isAdmin: boolean;
  _id: string;
  accessToken: string;
}
