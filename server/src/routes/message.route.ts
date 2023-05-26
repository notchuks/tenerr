import express, { Request, Response, NextFunction } from "express";
import { createMessageHandler, getMessagesHandler } from "../controllers/message.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { createMessageSchema } from "../schema/message.schema";

const router = express.Router();

router.get("/test", (req: Request, res: Response) => {
  res.send("It works!");
})

router.post("/", [validateResource(createMessageSchema), requireUser], createMessageHandler);
router.get("/:convoId", requireUser, getMessagesHandler);

export default router;