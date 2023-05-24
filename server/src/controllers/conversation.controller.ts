import { Request, Response } from "express";
import { CreateConversationInput, ReadConversationInput, UpdateConversationInput } from "../schema/conversation.schema";
import { createConversation, getConversation, getConversations, updateConversation } from "../services/conversation.service";


export async function createConversationHandler(req: Request<{}, {}, CreateConversationInput["body"]>, res: Response) {

  const isSeller = res.locals.user.isSeller;
  const userId = res.locals.user._id;
  console.log(isSeller);

  const input = {
    convoId: isSeller ? userId + req.body.to : req.body.to + userId,
    sellerId: isSeller ? userId : req.body.to,
    buyerId: isSeller ? req.body.to : userId,
    readBySeller: isSeller,
    readByBuyer: !isSeller
  }

  try {
    const conversation = await createConversation(input);
    return res.status(201).json(conversation);
  } catch (err: any) {
    return res.status(409).send(err);
  }
}

export async function updateConversationHandler(req: Request<UpdateConversationInput["params"]>, res: Response) {
  const convoId = req.params.convoId;
  const isSeller = res.locals.user.isSeller;

  try {
    const update = await updateConversation(convoId, isSeller, { new: true, });
    return res.status(200).send(update);
  } catch (err: any) {
    return res.status(400).send(err);
  }
}

export async function getConversationHandler(req: Request<ReadConversationInput["params"]>, res: Response) {
  const convoId = req.params.convoId;

  try {
    const conversation = await getConversation(convoId);
    res.status(200).send(conversation);
  } catch (err: any) {
    return res.status(404).send(err);
  }
}

export async function getConversationsHandler(req: Request, res: Response) {
  const isSeller = res.locals.user.isSeller;
  const userId = res.locals.user._id;

  try {
    const conversations = await getConversations(isSeller, userId);
    res.status(200).send(conversations);
  } catch (err: any) {
    return res.status(404).send(err);
  }
}