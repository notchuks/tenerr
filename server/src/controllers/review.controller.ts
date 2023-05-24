import { Request, Response } from "express";
import GigModel from "../models/gig.model";
import ReviewModel from "../models/review.model";
import { CreateReviewInput, ReadReviewInput, DeleteReviewInput } from "../schema/review.schema";
import { createReview, deleteReview, getReview, getReviews } from "../services/review.service";


export async function createReviewHandler(req: Request<{}, {}, CreateReviewInput["body"]>, res: Response) {

  if(res.locals.user.isSeller) {
    console.log("A seller can not create reviews");
    return res.status(403).send("A seller can not create reviews");
  }

  const userId = res.locals.user._id;
  console.log(userId);
  const body = req.body;
  const gigId = req.body.gigId;

  try {
    const created = await ReviewModel.findOne({ gigId: gigId, userId: userId });

    // Check if user has already created a review
    if (created) {
      console.log("You have already created a review for this gig.");
      return res.status(403).send("You have already created a review for this gig.");
    };

    const review = await createReview({ ...body, userId: userId });

    // Update stars on gig
    try {
      await GigModel.findOneAndUpdate({ gigId }, { $inc: { totalStars: req.body.star, starNumber: 1 } });
    } catch (err: any) {
      console.log(err);
    }

    return res.status(201).json(review);
  } catch (err: any) {
    return res.status(409).send(err);
  }
}

export async function getReviewsHandler(req: Request<ReadReviewInput["params"], {}, {}>, res: Response) {
  try {
    const reviews = await getReviews(req.params.gigId);
    res.status(200).send(reviews);
  } catch (err: any) {
    return res.status(400).send(err);
  }
}

export async function deleteReviewHandler(req: Request<DeleteReviewInput["params"]>, res: Response) {
  const userId = res.locals.user._id;
  const reviewId = req.params.reviewId;
  console.log(reviewId);

  const review = await getReview(reviewId);

  if(!review) {
    return res.sendStatus(404);
  }

  if(String(review.userId) !== userId) {
    return res.sendStatus(403);
  }

  await deleteReview({ _id: reviewId });

  return res.sendStatus(200);
}
