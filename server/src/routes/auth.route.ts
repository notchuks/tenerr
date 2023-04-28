import express, { Request, Response, NextFunction } from "express";
import { createUserHandler } from "../controllers/user.controller";

const router = express.Router();

router.get("/register", createUserHandler);

export default router;