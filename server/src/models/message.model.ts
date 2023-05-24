import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { ConversationDocument } from "./conversation.model";

export interface MessageDocument extends  mongoose.Document {
  convoId: string;
  userId: UserDocument["_id"];
  desc: string;
}

const messageSchema = new mongoose.Schema<MessageDocument>(
  {
    convoId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    desc: { type: String, required: true },
  }, {
    timestamps: true,
  }
);

const MessageModel = mongoose.model<MessageDocument>("Message", messageSchema);
export default MessageModel;