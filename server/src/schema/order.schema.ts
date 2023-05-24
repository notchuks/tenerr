import mongoose from "mongoose";
import { object, string, custom, number, boolean, TypeOf } from "zod";

const payload = {
  body: object({
    gigId: string({
      required_error: "gigId is required"
    }),
    img: string({
      required_error: "Image is required"
    }),
    price: custom<mongoose.Types.Decimal128>(),
    sellerId: custom<mongoose.Types.ObjectId>(),
    buyerId: custom<mongoose.Types.ObjectId>(),
    payment_intent: string({
      required_error: "Payment intent is required"
    })
  })
}

const params = {
  params: object({
    gigId: string({
      required_error: "gigId is required"
    }),
    _id: string({
      required_error: "orderId is required"
    })
  })
}

export const createOrderSchema = object({
  ...payload,
  ...params
})

export const updateOrderSchema = object({
  ...payload,
  ...params
})

export const getOrderSchema = object({
  ...params
})

export const deleteOrderSchema = object({
  ...params
})

export type CreateOrderInput = TypeOf<typeof createOrderSchema>
export type UpdateOrderInput = TypeOf<typeof updateOrderSchema>
export type ReadOrderInput = TypeOf<typeof getOrderSchema>
export type DeleteOrderInput = TypeOf<typeof deleteOrderSchema>