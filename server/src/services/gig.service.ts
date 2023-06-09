import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { Query } from "../controllers/gig.controller";
import GigModel, { GigDocument, GigInput } from "../models/gig.model";

export async function createGig(input: GigInput) {
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

export async function findGigs(filters: Query, arrange: string) {
  try {
    const gigs = await GigModel.find(filters).sort({ [arrange]: -1 });
    return gigs;
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
  return await GigModel.deleteOne(query);
}

