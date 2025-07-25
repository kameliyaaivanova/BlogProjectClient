import { Category } from "./Category"

export interface Post {
  id?: number;
  title: String;
  description: String;
  author?: String;
  createdAt?: number;
  logo: String;
  categories: Category[];
  content: String;
  likes?: number;
}
