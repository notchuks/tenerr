import { Request, Response, CookieOptions } from "express";
import config from "config";
import { validatePassword } from "../services/user.service";
import { createSession, findSessions, updateSession } from "../services/session.service";
import { signJwt } from "../utils/jwt.utils";
import { logger } from "../utils";

const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "strict",
  secure: false,
};

// They have the same options apart from maxAge
const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10, // 1 year
};

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate the user's password
  const user = await validatePassword(req.body);

  if(!user) {
    return res.status(401).send("Invalid user credentials");
  };

  try {
    // create a session
    const session = await createSession(user._id, req.get("user-agent") || "");

    // create an accessToken
    const accessToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.get<string>("accessTokenTtl") }
    );

    // create a refreshToken
    const refreshToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.get<string>("refreshTokenTtl") }
    );

    res.cookie("accessToken", accessToken, accessTokenCookieOptions);

    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    // Return access & refresh tokens
    return res.send({ accessToken, refreshToken });
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send(e.message);
  }
};

export async function getUserSessionsHandler(req: Request, res: Response) {
  // user in res.locals is gotten when we deserialize the user object from our accessToken, which we derived when creating a session by signing our user object + our session id. Refer jwt.utils
  const userId = res.locals.user._id;
  // console.log("userId: ", userId);

  try {
    const sessions = await findSessions({ user: userId, valid: true });
    return res.status(200).send(sessions);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send(e.message);
  }
}

export async function deleteUserSessionHandler(req: Request, res: Response) {
  // We assign the decoded object to res.locals.user in deserializeUser(a middleware for all routes). refer above + jwt.utils + deserializeUser for more info.
  const sessionId = res.locals.user.session;
  console.log(sessionId);

  try {
    // set session validity to false instead of deleting it
    const session = await updateSession({ _id: sessionId }, { valid: false });
    console.log(session);
    // After the above is implemented, the user can still get sessions with that accessToken when using postman because the accessToken is still in the request header in our postman environment variables. But with the response below when using a client, we can set the accessToken to null in subsequent get requests, so that a 403 forbidden error can be returned instead of the user.
    res.clearCookie("accessToken", accessTokenCookieOptions);
    res.clearCookie("refreshToken", refreshTokenCookieOptions);

    res.status(200).end();
    
    // return res.send({
    //   accessToken: null,
    //   refreshToken: null,
    // });
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send(e.message);
  }
}