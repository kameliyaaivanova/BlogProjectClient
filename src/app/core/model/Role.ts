import { Permission } from "./Permission";

export interface Role {
  id?: number
  name: String;
  permissions: Permission[];
  createdAt: number;
}
