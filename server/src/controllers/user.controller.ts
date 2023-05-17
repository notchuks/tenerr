import express, { Request, Response, NextFunction } from "express";
import { CreateUserInput, ReadUserInput } from "../schema/user.schema";
import { createUser, findUser } from "../services/user.service";
import { logger } from "../utils";

export async function createUserHandler(req :Request<{}, {}, CreateUserInput["body"]>, res: Response) {
  try {
    // console.log(req.body);
    const user = await createUser(req.body);
    return res.status(201).send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send(e.message);
  }
}

export async function findUserHandler(req: Request<ReadUserInput["params"]>, res: Response) {
  const userId = req.params.userId;
  // console.log(userId);

  const user = await findUser({ _id: userId });
  // console.log(gig);

  if (!user) {
    return res.sendStatus(404);
  }

  return res.json(user);
}

export async function getCurrentUser(req: Request, res: Response) {
  // We'll use the deserializeUser middleware on this route, so we can send the decoded user as our response 
  try {
    return res.send(res.locals.user);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send(e.message);
  }
}