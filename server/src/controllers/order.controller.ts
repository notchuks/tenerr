import { Request, Response } from "express";
import mongoose from "mongoose";
import GigModel from "../models/gig.model";
import OrderModel, { OrderInput } from "../models/order.model";
import { CreateOrderInput, ReadOrderInput } from "../schema/order.schema";
import { createOrder, findOrders } from "../services/order.service";

export async function createOrderHandler(req: Request<CreateOrderInput["params"], {}, CreateOrderInput["body"]>, res: Response) {

  const userId = res.locals.user._id;
  const gigId = req.params.gigId;

  try {

    const gig = await GigModel.findOne({ gigId: gigId });

    if(!gig) {
      return res.status(404).send("Gig with that id does not exist.")
    }

    // const dprice = new mongoose.Types.Decimal128(gig.price.toString())
    // console.log(typeof dprice);

    const gigDetails = {
      gigId: gig.gigId,
      img: gig.cover,
      title: gig.title,
      sellerId: gig.userId,
      price: gig.price,
    }

    const input = {
      buyerId: userId,
      payment_intent: "temporary",
    }

    const order = await createOrder(input, gigDetails);

    return res.status(201).json(order);
  } catch (err: any) {
    return res.status(409).send(err);
  }
}

export async function getOrdersHandler(req: Request, res: Response) {
  const query = res.locals.user.isSeller ? { sellerId: res.locals.user._id } : { buyerId: res.locals.user._id };
  // console.log(query);

  try {
    const orders = await findOrders(query);
    return res.status(200).json(orders);
  } catch (err) {
    res.status(409).send(err);
  }
}