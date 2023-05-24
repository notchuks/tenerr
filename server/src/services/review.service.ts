import { FilterQuery } from "mongoose";
import ReviewModel, { ReviewInput } from "../models/review.model";

export async function createReview(input: ReviewInput) {
  try {
    const review = await ReviewModel.create(input);
    return review;
  } catch (err) {
    throw err;
  }
}

export async function getReviews(gigId: string) {
  try {
    // find all reviews for a gig
    const reviews = await ReviewModel.find({ gigId: gigId });
    return reviews;
  } catch (err) {
    throw err;
  }
}

// To fetch just a single review by its id
export async function getReview(reviewId: string) {
  try {
    const review = await ReviewModel.findOne({ reviewId: reviewId });
    return review;
  } catch (err) {
    throw err;
  }
}

export async function deleteReview(query: FilterQuery<ReviewInput>) {
  try {
    return await ReviewModel.deleteOne(query);
  } catch (err) {
    throw err;
  }
}