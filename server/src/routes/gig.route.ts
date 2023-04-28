import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get("/test", (req: Request, res: Response) => {
  res.send("It works!");
})

export default router;