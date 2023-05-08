import express, { Request, Response, NextFunction } from "express";
import { deleteUserSessionHandler, getUserSessionsHandler } from "../controllers/session.controller";
import { getCurrentUser } from "../controllers/user.controller";
import requireUser from "../middleware/requireUser";

const router = express.Router();

router.get("/test", (req: Request, res: Response) => {
  res.send("It works!");
})

router.get("/me", requireUser, getCurrentUser);

router.get("/sessions", requireUser, getUserSessionsHandler);

router.delete("/sessions", requireUser, deleteUserSessionHandler);

export default router;