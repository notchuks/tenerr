import { omit } from "lodash";
import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import UserModel, { UserInput } from "../models/user.model";

export async function createUser(input: UserInput) { // Used "Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">" because createdAt & updatedAt are automatically generated so dont need to be passed into this function type
  try {
    const user =  await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}