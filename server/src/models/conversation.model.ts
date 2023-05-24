import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { GigDocument } from "./gig.model";

export interface ConversationInput {
  convoId: string;
  sellerId: UserDocument["_id"];
  buyerId: UserDocument["_id"];
  readBySeller: boolean;
  readByBuyer: boolean;
  lastMessage: string;
}

export interface ConversationDocument extends ConversationInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema = new mongoose.Schema<ConversationDocument>(
  {
    convoId: { type: String, required: true, unique: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    readBySeller: { type: Boolean, required: true },
    readByBuyer: { type: Boolean, required: true },
    lastMessage: { type: String, required: false },
  }, {
    timestamps: true,
  }
);

const ConversationModel = mongoose.model<ConversationDocument>("Conversation", conversationSchema);
export default ConversationModel;




