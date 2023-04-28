import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";

export interface GigDocument extends  mongoose.Document {
  userId: UserDocument["_id"];
  title: string;
  desc: string;
  totalStars: number;
  starNumber: number;
  cat: string;
  price: number;
  cover: string;
  images: string[];
  shortTitle: string;
  shortDesc: string;
  deliveryTime: number;
  revisonNumber: number;
  features: string[];
  sales: number;
  createdAt: Date;
  updatedAt: Date;
}

const gigSchema = new mongoose.Schema<GigDocument>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    totalStars: { type: Number, default: 0 },
    starNumber: { type: Number, default: 0 },
    cat: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], required: false },
    shortTitle: { type: String, required: true },
    shortDesc: { type: String, required: true },
    deliveryTime: { type: Number, required: true },
    revisonNumber: { type: Number, required: true },
    features: { type: [String], required: false },
    sales: { type: Number, required: false },
  }, {
    timestamps: true,
  }
);

const GigModel = mongoose.model<GigDocument>("User", gigSchema);
export default GigModel;




