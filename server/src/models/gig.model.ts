import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface GigInput {
  userId: UserDocument["_id"];
  title: string;
  desc: string;
  totalStars?: number;
  starNumber?: number;
  cat: string;
  price: mongoose.Types.Decimal128;
  cover: string;
  images?: string[];
  shortTitle: string;
  shortDesc: string;
  deliveryTime: number;
  revisionNumber: number;
  features?: string[];
  sales?: number;
}

export interface GigDocument extends GigInput, mongoose.Document {
  gigId: string;
  createdAt: Date;
  updatedAt: Date;
}

const gigSchema = new mongoose.Schema<GigDocument>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    gigId: { type: String, required: true, unique: true, default: () => `gig_${nanoid()}`,},
    title: { type: String, required: true },
    desc: { type: String, required: true },
    totalStars: { type: Number, default: 0 },
    starNumber: { type: Number, default: 0 },
    cat: { type: String, required: true },
    price: { type: mongoose.Schema.Types.Decimal128, required: true },
    cover: { type: String, required: true },
    images: { type: [String], required: false },
    shortTitle: { type: String, required: true },
    shortDesc: { type: String, required: true },
    deliveryTime: { type: Number, required: true },
    revisionNumber: { type: Number, required: true },
    features: { type: [String], required: false },
    sales: { type: Number, default: 0 },
  }, {
    timestamps: true,
  }
);

gigSchema.set("toJSON", {
  getters: true,
  transform: (doc, ret) => {
    ret.price = ret.price.toString();
    return ret;
  }
});

const GigModel = mongoose.model<GigDocument>("Gig", gigSchema);
export default GigModel;




