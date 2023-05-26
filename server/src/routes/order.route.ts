import express, { Request, Response, NextFunction } from "express";
import validateResource from "../middleware/validateResource";
import requireUser from "../middleware/requireUser";
import { createOrderSchema } from "../schema/order.schema";
import { createOrderHandler, getOrdersHandler, intent } from "../controllers/order.controller";

const router = express.Router();

router.get("/test", (req: Request, res: Response) => {
  res.send("It works!");
})

router.post("/:gigId", requireUser, createOrderHandler);
router.post("/create-payment-intent/:gigId", requireUser, intent);
router.get("/", requireUser, getOrdersHandler);

export default router;