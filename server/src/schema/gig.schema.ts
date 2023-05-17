import mongoose from "mongoose";
import { object, string, custom, number, array, TypeOf } from "zod";

const payload = {
  body: object({
    title: string({
      required_error: "Title is required"
    }),
    desc: string({
      required_error: "Description is required"
    }).min(120, "Description should be at least 120 characters long"),
    totalStars: number().optional(),
    starNumber: number().optional(),
    cat: string({
      required_error: "Category is required"
    }),
    price: custom<mongoose.Types.Decimal128>(),
    cover: string({
      required_error: "Cover Image is required"
    }),
    images: array(string()).optional(),
    shortTitle: string({
      required_error: "Short title is required"
    }),
    shortDesc: string({
      required_error: "Short Description is required"
    }),
    deliveryTime: number({
      required_error: "Delivery Time is required"
    }),
    revisionNumber: number({
      required_error: "Revison Number is required"
    }),
    features: array(string()).optional(),
    sales: number().optional(),
  })
}

const params = {
  params: object({
    gigId: string({
      required_error: "gigId is required"
    })
  })
}

export const createGigSchema = object({
  ...payload
})

export const updateGigSchema = object({
  ...payload,
  ...params
})

export const getGigSchema = object({
  ...params
})

export const deleteGigSchema = object({
  ...params
})

export type CreateGigInput = TypeOf<typeof createGigSchema>
export type UpdateGigInput = TypeOf<typeof updateGigSchema>
export type ReadGigInput = TypeOf<typeof getGigSchema>
export type DeleteGigInput = TypeOf<typeof deleteGigSchema>