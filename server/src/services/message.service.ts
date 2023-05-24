import { QueryOptions } from "mongoose";
import { Input } from "../controllers/message.controller";
import ConversationModel from "../models/conversation.model";
import MessageModel from "../models/message.model";


export async function createMessage(input: Input, isSeller: boolean, options: QueryOptions) {
  try {
    const message = await MessageModel.create(input);
    await ConversationModel.findOneAndUpdate({ convoId: input.convoId },
      {
        $set: {
          readBySeller: isSeller,
          readByBuyer: !isSeller,
          lastMessage: input.desc,
        },
      },
      options
    );
    return message;
  } catch (err) {
    throw err;
  }
};

export async function getMessages(convoId: string) {
  try {
    const messages = await MessageModel.find({ convoId });
    return messages;
  } catch (err) {
    throw err;
  }
}