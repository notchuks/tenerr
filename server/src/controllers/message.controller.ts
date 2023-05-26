import { Request, Response } from "express";
import { CreateMessageInput, ReadMessageInput } from "../schema/message.schema";
import { createMessage, getMessages } from "../services/message.service";

export interface Input {
  convoId: string;
  desc: string;
  userId: string;
}

export async function createMessageHandler(req: Request<{}, {}, CreateMessageInput["body"]>, res: Response) {

  const convoId = req.body.convoId;
  const desc = req.body.desc;
  console.log(desc);
  const userId = res.locals.user._id;
  const isSeller = res.locals.user.isSeller;

  const input: Input = { convoId, desc, userId }

  try {
    const message = await createMessage(input, isSeller, { new: true, });
    return res.status(201).json(message);
  } catch (err: any) {
    return res.status(409).send(err);
  }
}

export async function getMessagesHandler(req: Request<ReadMessageInput["params"]>, res: Response) {
  const convoId = req.params.convoId;

  try {
    const messages = await getMessages(convoId);
    res.status(200).send(messages);
  } catch (err: any) {
    return res.status(404).send(err);
  }
}