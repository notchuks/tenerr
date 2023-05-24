import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { GigDocument } from "./gig.model";

export interface OrderInput {
  gigId: string;
  img: string;
  title: string;
  price: mongoose.Types.Decimal128;
  payment_intent: string;
  sellerId: UserDocument["_id"];
  buyerId: UserDocument["_id"];
}

export interface OrderDocument extends OrderInput, mongoose.Document {
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema<OrderDocument>(
  {
    gigId: { type: String, required: true },
    img: { type: String, required: false },
    title: { type: String, required: true },
    price: { type: mongoose.Schema.Types.Decimal128, required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isCompleted: { type: Boolean, default: false },
    payment_intent: { type: String, required: true },
  }, {
    timestamps: true,
  }
);

orderSchema.set("toJSON", {
  getters: true,
  transform: (doc, ret) => {
    if (ret.price !==  "undefined") {
      ret.price = ret.price.toString();
    }
    return ret;
  }
});

const OrderModel = mongoose.model<OrderDocument>("Order", orderSchema);
export default OrderModel;




