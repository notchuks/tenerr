import { get } from "lodash";
import config from "config";
import SessionModel, { SessionDocument } from "../models/session.model";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { findUser } from "./user.service";
import { FilterQuery, UpdateQuery } from "mongoose";


export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
};

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return await SessionModel.find(query).lean();
}

export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
  return await SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({ refreshToken }: { refreshToken: string }) {
  const { decoded } = verifyJwt(refreshToken);
  // console.log(decoded);

  // if no user object or session id is returned from verifyJwt return false
  if(!decoded || !get(decoded, "session")) return false;

  // use sessionId to find session object refer createUserSessionHandler in session.conroller & verifyJwt for more info.
  const session = await SessionModel.findById(get(decoded, "session"));
  // console.log(session);

  if(!session ) return false;

  // added this to prevent deleted(invalidated) sessions from reIssuing accessTokens and therefore logging in.
  if(session && session.valid === false) {
    console.log("Session don dey invalid o!");
    return false;
  }
  // if(!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });
  // console.log(user);

  if(!user) return false;

  // Create a new accessToken
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") }
  );

  return accessToken;
};