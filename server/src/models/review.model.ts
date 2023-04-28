import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { GigDocument } from "./gig.model";

export interface ReviewDocument extends  mongoose.Document {
  userId: UserDocument["_id"];
  gigId: GigDocument["_id"];
  star: number;
  desc: string;
}

const reviewSchema = new mongoose.Schema<ReviewDocument>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    gigId: { type: mongoose.Schema.Types.ObjectId, ref: "Gig", required: true },
    star: { type: Number, required: true, enum: [1,2,3,4,5] },
    desc: { type: String, required: true },
  }, {
    timestamps: true,
  }
);

const ReviewModel = mongoose.model<ReviewDocument>("Review", reviewSchema);
export default ReviewModel;




