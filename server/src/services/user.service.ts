import { omit } from "lodash";
import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import UserModel, { UserInput, UserDocument } from "../models/user.model";

export async function createUser(input: UserInput) { // Used "Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">" because createdAt & updatedAt are automatically generated so dont need to be passed into this function type
  try {
    const user =  await UserModel.create(input);
    return user.toJSON();
    // return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePassword({ username, password }: { username: string; password: string; }) {
  const user = await UserModel.findOne({ username });

  if(!user) {
    return false;
  };

  const isValid = await user.comparePassword(password);

  if(!isValid) return false;

  return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return await UserModel.findOne(query).lean().select("-password");
}