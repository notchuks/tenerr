import express, { Request, Response, NextFunction } from "express";
import { createReviewHandler, deleteReviewHandler, getReviewsHandler } from "../controllers/review.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { createReviewSchema } from "../schema/review.schema";

const router = express.Router();

router.get("/test", (req: Request, res: Response) => {
  res.send("It works!");
})

router.post("/", [validateResource(createReviewSchema), requireUser], createReviewHandler);
router.get("/:gigId", requireUser, getReviewsHandler);
// router.get("/:reviewId", getReviewsHandler); haven't written controller for this
router.delete("/:reviewId", requireUser, deleteReviewHandler);

export default router;