import express, { Request, Response, NextFunction } from "express";
import { createGigHandler, deleteGigHandler, getGigHandler, getGigsHandler, updateGigHandler } from "../controllers/gig.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { createGigSchema } from "../schema/gig.schema";

const router = express.Router();

router.get("/test", (req: Request, res: Response) => {
  res.send("It works!");
})

router.post("/", [validateResource(createGigSchema), requireUser], createGigHandler);
router.get("/:gigId", requireUser, getGigHandler);
router.get("/", getGigsHandler);
router.put("/:gigId", requireUser, updateGigHandler);
router.delete("/:gigId", requireUser, deleteGigHandler);

export default router;