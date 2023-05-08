import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import GigModel, { GigDocument } from "../models/gig.model";

export async function createGig(input: GigDocument) {
  try {
    const gig = await GigModel.create(input);
    return gig;
  } catch (err) {
    throw err;
  }
};

export async function findGig(query: FilterQuery<GigDocument>, options: QueryOptions = { lean: true }) {
  try {
    const gig = await GigModel.findOne(query, {}, options);
    return gig;
  } catch (err) {
    throw err;
  }
};

export async function updateGig(query: FilterQuery<GigDocument>, update: UpdateQuery<GigDocument>, options: QueryOptions) {
  try {
    const gig = await GigModel.findOneAndUpdate(query, update, options);
    return gig;
  } catch (err) {
    throw err;
  }
};

export async function deleteGig(query: FilterQuery<GigDocument>) {
  return GigModel.deleteOne(query);
}

