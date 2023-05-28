import { Request, Response } from "express";
import Stripe from "stripe";
import * as dotenv from "dotenv";
import path from "path";
import GigModel from "../models/gig.model";
import { CreateOrderInput, ReadOrderInput } from "../schema/order.schema";
import { createOrder, findOrders, updateOrder } from "../services/order.service";

dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

const { STRIPE_SK = "" } = process.env;

export async function intent(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const gigId = req.params.gigId;
  const stripe = new Stripe(STRIPE_SK, { apiVersion: "2022-11-15" });

  console.log(STRIPE_SK);

  const gig = await GigModel.findOne({ gigId });

  if(!gig) {
    return res.status(404).send("Gig does not exist");
  }

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(gig.price.toString()) * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const gigDetails = {
    gigId: gig.gigId,
    img: gig.cover,
    title: gig.title,
    sellerId: gig.userId,
    price: gig.price,
  }

  const input = {
    buyerId: userId,
    payment_intent: paymentIntent.id,
  }

  const order = await createOrder(input, gigDetails);

  return res.status(201).json({ clientSecret: paymentIntent.client_secret });
}

// Out of service. Intent is used to create orders now.
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
  console.log(query);

  try {
    const orders = await findOrders(query);
    return res.status(200).json(orders);
  } catch (err) {
    res.status(409).send(err);
  }
}

export async function updateOrderHandler(req: Request, res: Response) {
  const payment_intent = req.body.payment_intent;

  try {
    const order = await updateOrder(payment_intent);
    return res.status(200).json("Order has been confirmed.");
  } catch (err) {
    res.status(409).send(err);
  }
}