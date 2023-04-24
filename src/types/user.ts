export type UserRequest = {
  firstName: string;
  lastName: string;
  password?: string;
  email: string;
  role: string;
};

export type UserResponse = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export type UserLogged = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  token: string;
};
