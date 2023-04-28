import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { GigDocument } from "./gig.model";

export interface OrderDocument extends mongoose.Document {
  userId: UserDocument["_id"];
  gigId: GigDocument["_id"];
  img: string;
  title: string;
  price: number;
  sellerId: UserDocument["_id"];
  buyerId: UserDocument["_id"];
  isCompleted: boolean;
  payment_intent: string;
}

const orderSchema = new mongoose.Schema<OrderDocument>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    gigId: { type: mongoose.Schema.Types.ObjectId, ref: "Gig", required: true },
    img: { type: String, required: false },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isCompleted: { type: Boolean, default: false },
    payment_intent: { type: String, required: true },
  }, {
    timestamps: true,
  }
);

const OrderModel = mongoose.model<OrderDocument>("Order", orderSchema);
export default OrderModel;




