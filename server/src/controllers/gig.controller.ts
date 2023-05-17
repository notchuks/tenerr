import { Request, Response } from "express";
import { createGig, deleteGig, findGig, findGigs, updateGig } from "../services/gig.service";
import { CreateGigInput, DeleteGigInput, ReadGigInput, UpdateGigInput } from "../schema/gig.schema";
import { UserDocument } from "../models/user.model";
import { filter } from "lodash";

export interface Query {
  userId: UserDocument["_id"];
  cat: string;
  min: number;
  max: number;
  search: string;
  sort: string;
};

export async function createGigHandler(req: Request<{}, {}, CreateGigInput["body"]>, res: Response) {
  const userId = res.locals.user._id;

  const body = req.body;

  if(!res.locals.user.isSeller) {
    return res.status(403).send("Only Sellers can create a gig.")
  }

  try {
    const gig = await createGig({ ...body, userId: userId });
    return res.status(201).json(gig);
  } catch (err) {
    res.status(409).send(err);
  }
}
export async function getGigHandler(req: Request<ReadGigInput["params"]>, res: Response) {
  const gigId = req.params.gigId;
  // console.log(gigId);

  const gig = await findGig({ gigId });
  // console.log(gig);

  if (!gig) {
    return res.sendStatus(404);
  }

  return res.json({...gig, "price": gig.price.toString() });
}
export async function getGigsHandler(req: Request<{}, {}, {}, Query>, res: Response) {
  const q = req.query;

  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  // console.log(filters);
  console.log(q.sort);
  const gigs = await findGigs(filters, q.sort);
  
  return res.json(gigs).status(200);
}
export async function deleteGigHandler(req: Request<DeleteGigInput["params"]>, res: Response) {
  const userId = res.locals.user._id;
  console.log(userId);
  const gigId = req.params.gigId;
  console.log(gigId);

  const gig = await findGig({ userId });

  if(!gig) {
    return res.sendStatus(404);
  }

  if(String(gig.userId) !== userId) {
    return res.sendStatus(403);
  }

  await deleteGig({ gigId });

  return res.sendStatus(200);
}

export async function updateGigHandler (req: Request<UpdateGigInput["params"]>, res: Response) {
  const userId = res.locals.user._id;

  const gigId = req.params.gigId;
  const update = req.body;

  const gig = await findGig({ userId });

  if(!gig) {
    return res.sendStatus(404);
  }

  if(String(gig.userId ) !== userId) {
    return res.sendStatus(403);
  }

  const updatedGig = await updateGig({ gigId }, update, { new: true, });

  return res.send(updatedGig);
}