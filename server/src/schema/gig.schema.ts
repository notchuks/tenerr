import { object, string, number, array, TypeOf } from "zod";

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
    price: number({
      required_error: "Price is required"
    }),
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
    revisonNumber: number({
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

export type CreateProductInput = TypeOf<typeof createGigSchema>
export type UpdateProductInput = TypeOf<typeof updateGigSchema>
export type ReadProductInput = TypeOf<typeof getGigSchema>
export type DeleteProductInput = TypeOf<typeof deleteGigSchema>