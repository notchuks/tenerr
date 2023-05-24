import mongoose from "mongoose";
import { object, string, number, TypeOf } from "zod";

const payload = {
  body: object({
    gigId: string({
      required_error: "gigId is required"
    }),
    star: number({
      required_error: "number of stars is required"
    }),
    desc: string({
      required_error: "Description is required"
    }),
  })
}

const params = {
  params: object({
    gigId: string({
      required_error: "gigId is required"
    }),
  }),
}

const otra = {
  params: object({
    reviewId: string({
      required_error: "reviewId is required"
    }),
  }),
}

// otra is for deleting a gig, as the gigId can be for many gigs, but the reviewid is for only one.

export const createReviewSchema = object({
  ...payload
})

export const updateReviewSchema = object({
  ...payload
})

export const getReviewSchema = object({
  ...params
})

export const deleteReviewSchema = object({
  ...otra
})

export type CreateReviewInput = TypeOf<typeof createReviewSchema>
export type UpdateReviewInput = TypeOf<typeof updateReviewSchema>
export type ReadReviewInput = TypeOf<typeof getReviewSchema>
export type DeleteReviewInput = TypeOf<typeof deleteReviewSchema>