import { object, string, TypeOf } from "zod";

// convoId is in both payload and params because we send it in req body when creating a message, and use it to fetch messages as well.
const payload = {
  body: object({
    desc: string({
      required_error: "Message body is required"
    }),
    convoId: string({
      required_error: "convoId is required"
    }),
  })
}

const params = {
  params: object({
    convoId: string({
      required_error: "convoId is required"
    }),
    userId: string({
      required_error: "userId is required"
    })
  })
}

export const createMessageSchema = object({
  ...payload,
  ...params
})

export const updateMessageSchema = object({
  ...payload,
  ...params
})

export const getMessageSchema = object({
  ...params
})

export const deleteMessageSchema = object({
  ...params
})

export type CreateMessageInput = TypeOf<typeof createMessageSchema>
export type UpdateMessageInput = TypeOf<typeof updateMessageSchema>
export type ReadMessageInput = TypeOf<typeof getMessageSchema>
export type DeleteMessageInput = TypeOf<typeof deleteMessageSchema>