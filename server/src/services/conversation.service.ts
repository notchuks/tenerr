import { QueryOptions } from "mongoose";
import ConversationModel, { ConversationDocument } from "../models/conversation.model";


export async function createConversation(input: any) {
  try {
    const conversation = await ConversationModel.create(input);
    return conversation;
  } catch (err) {
    throw err;
  }
};

export async function updateConversation(convoId: any, isSeller: any, options: QueryOptions) {
  try {
    const update = await ConversationModel.findOneAndUpdate(
      { convoId },
      {
        $set: {
          ...(isSeller ? { readBySeller: true } : { readByBuyer: !isSeller }),
        },
      },
      options
    );
    return update;
  } catch (err) {
    throw err;
  }
};

export async function getConversation(convoId: any) {
  try {
    const conversation = await ConversationModel.findOne({ convoId });
    return conversation;
  } catch (err) {
    throw err;
  }
}

export async function getConversations(isSeller: any, userId: any) {
  try {
    const conversations = await ConversationModel.find(isSeller ? { sellerId: userId } : { buyerId: userId });
    return conversations;
  } catch (err) {
    throw err;
  }
}
