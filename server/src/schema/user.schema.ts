import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    username: string({
      required_error: "username is required"
    }),
    password: string({
      required_error: "Password is required"
    }).min(6, "Password too short - should be 6 chars minimum"),
    passwordConfirmation: string({
      required_error: "passwordConfirmation is required"
    }),
    country: string({
      required_error: "country is required"
    }),
    email: string({
      required_error: "Email is required"
    }).email("Invalid email"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match :(",
    path: ["passwordConfirmation"],
  })
});

const params = {
  params: object({
    userId: string({
      required_error: "userId is required"
    })
  })
}

export const getUserSchema = object({
  ...params
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type ReadUserInput = TypeOf<typeof getUserSchema>;