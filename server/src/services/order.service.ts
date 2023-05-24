import mongoose from "mongoose";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import OrderModel, { OrderInput } from "../models/order.model";

interface GigDetails {
  gigId: string;
  img: string;
  title: string;
  sellerId: string;
  price: mongoose.Types.Decimal128;
}

export async function createOrder(input: Partial<OrderInput>, gigDetails: GigDetails) {
  try {
    const order = await OrderModel.create({ ...input, ...gigDetails });
    return order;
  } catch (err) {
    throw err;
  }
};

// export async function findGig(query: FilterQuery<GigDocument>, options: QueryOptions = { lean: true }) {
//   try {
//     const gig = await GigModel.findOne(query, {}, options);
//     return gig;
//   } catch (err) {
//     throw err;
//   }
// };

export async function findOrders(query: any) {
  try {
    const orders = await OrderModel.find({ ...query, isCompleted: true });
    return orders;
  } catch (err) {
    throw err;
  }
};