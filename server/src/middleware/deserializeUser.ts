import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../services/session.service";

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, "cookies.accessToken") || get(req, "headers.authorization")?.replace(/^Bearer\s/, "");
  // console.log("accessToken: ", accessToken);

  const getHeader = () => {
    if (req?.cookies?.refreshToken) {
      return req.cookies.refreshToken;
    } else {
      return Array.isArray(req.headers['x-refresh']) ? req.headers['x-refresh'][0] : req.headers['x-refresh'];
    }
  }

  const refreshToken = getHeader();
  // console.log("refreshToken: ", refreshToken);

  // here we should actually decode the accessToken and check if it has expired, instead of just checking for its presence, because it is always present in the postman request. Understand were building for a client that removes it from cookies once its expired, though.
  if (!accessToken && !refreshToken) {
    console.log("accessToken don expire o!");
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);
  // console.log({ decoded, expired });

  if (decoded) {
    res.locals.user = decoded;
    console.log("accessToken dey valid!");
    return next();
  }

  if ((expired && refreshToken) || (!accessToken && refreshToken)) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if(newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);

      res.cookie("accessToken", newAccessToken, {
        maxAge: 900000, // 15 mins
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: false,
      });
    }

    const result = verifyJwt(newAccessToken as string);

    res.locals.user = result.decoded;

    console.log("accessToken don expire o! so i say make i give you new one!"); // , result.decoded
    return next();
  }

  return next();
};

export default deserializeUser;