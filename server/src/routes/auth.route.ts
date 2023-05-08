import express, { Request, Response, NextFunction } from "express";
import { createUserSessionHandler, deleteUserSessionHandler, getUserSessionsHandler } from "../controllers/session.controller";
import { createUserHandler, getCurrentUser } from "../controllers/user.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { createSessionSchema } from "../schema/session.schema";
import { createUserSchema } from "../schema/user.schema";

const router = express.Router();

router.post("/register", validateResource(createUserSchema), createUserHandler);

router.post("/login", validateResource(createSessionSchema), createUserSessionHandler);



export default router;

// router.get("/check", async (req: Request, res: Response, next: NextFunction) => {
//   let user = await findUser({ username: "primero" });
//   if (!user) {
//     return res.status(404).send("user not found");
//   }
//   return res.send(JSON.stringify(user));
// });