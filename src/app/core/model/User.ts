import { Role } from "./Role";

export interface User {
  id?: number
  username: String;
  email: String;
  createdAt?: number;
  role: Role;
  password?: String;
}
