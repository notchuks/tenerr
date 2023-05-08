import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

const {
  PRIVATE_KEY, // = ''
  PUBLIC_KEY, //  = ''
} = process.env;


export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, PRIVATE_KEY as string, {
    ...(options && options), // make sure options is not undefined before spreading it 
    algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, PUBLIC_KEY as string);
    return {
      valid: true,
      expired: false, 
      decoded,
    }
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    }
  }
}