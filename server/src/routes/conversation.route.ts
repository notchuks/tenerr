import express, { Request, Response, NextFunction } from "express";
import { createConversationHandler, getConversationHandler, getConversationsHandler, updateConversationHandler } from "../controllers/conversation.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { createConversationSchema } from "../schema/conversation.schema";

const router = express.Router();

router.get("/test", (req: Request, res: Response) => {
  res.send("It works!");
})

router.post("/", [validateResource(createConversationSchema), requireUser], createConversationHandler);
router.put("/:convoId", requireUser, updateConversationHandler);
router.get("/", requireUser, getConversationsHandler);
router.get("/:convoId", requireUser, getConversationHandler);



export default router;