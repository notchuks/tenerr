import { object, string, TypeOf } from "zod";

const payload = {
  body: object({
    to: string({
      required_error: "Destination is required"
    })
  })
}

const params = {
  params: object({
    convoId: string({
      required_error: "convoId is required"
    })
  })
}

export const createConversationSchema = object({
  ...payload
})

export const updateConversationSchema = object({
  ...payload,
  ...params
})

export const getConversationSchema = object({
  ...params
})

export const deleteConversationSchema = object({
  ...params
})

export type CreateConversationInput = TypeOf<typeof createConversationSchema>
export type UpdateConversationInput = TypeOf<typeof updateConversationSchema>
export type ReadConversationInput = TypeOf<typeof getConversationSchema>
export type DeleteConversationInput = TypeOf<typeof deleteConversationSchema>