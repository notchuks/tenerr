import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { GigDocument } from "./gig.model";

export interface ReviewInput {
  userId: UserDocument["_id"];
  gigId: string;
  star: number;
  desc: string;
}

export interface ReviewDocument extends ReviewInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new mongoose.Schema<ReviewDocument>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    gigId: { type: String, required: true },
    star: { type: Number, required: true, enum: [1,2,3,4,5] },
    desc: { type: String, required: true },
  }, {
    timestamps: true,
  }
);

const ReviewModel = mongoose.model<ReviewDocument>("Review", reviewSchema);
export default ReviewModel;




