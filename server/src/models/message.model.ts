import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { ConversationDocument } from "./conversation.model";

export interface MessageDocument extends  mongoose.Document {
  conversationId: ConversationDocument["_id"];
  userId: UserDocument["_id"];
  desc: string;
}

const messageSchema = new mongoose.Schema<MessageDocument>(
  {
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    desc: { type: String, required: true },
  }, {
    timestamps: true,
  }
);

const MessageModel = mongoose.model<MessageDocument>("Message", messageSchema);
export default MessageModel;