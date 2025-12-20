import { User } from "../types/user.types";

let users: User[] = [];

export const getInfo = (): User[] => {
  return users;
};

export const pstInfo = (name: string, email: string): User => {
  const newUser: User = {
    id: Date.now(),
    name,
    email
  };

  users.push(newUser);
  return newUser;
};
