import { Model, Document } from "mongoose";

interface User {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role: "User" | "Host";
}

export interface UserDocument extends User, Document {}

export interface UserModel extends Model<UserDocument> {
  checkCredentials(
    email: string,
    password: string
  ): Promise<UserDocument | null>;
}
