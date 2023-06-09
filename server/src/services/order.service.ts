import mongoose from "mongoose";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import OrderModel, { OrderDocument, OrderInput } from "../models/order.model";

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

export async function findOrders(query: any) {
  try {
    const orders = await OrderModel.find({ ...query, isCompleted: true });
    return orders;
  } catch (err) {
    throw err;
  }
};

export async function updateOrder(payment_intent: FilterQuery<OrderDocument>) {
  try {
    const order = await OrderModel.findOneAndUpdate({ payment_intent }, { $set: { isCompleted: true } });
    return order;
  } catch (err) {
    throw err;
  }
};