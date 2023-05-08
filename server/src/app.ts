import express from "express";
import config from "config";
import * as dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connect, logger } from "./utils";
import { authRoute, userRoute, gigRoute, conversationRoute, messageRoute, orderRoute, reviewRoute } from "./routes";
import deserializeUser from "./middleware/deserializeUser";

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const {
  ORIGIN
} = process.env;

const port = config.get<number>("port");

const app = express();

app.use(cors({
  origin: ORIGIN,
  credentials: true
}))

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", deserializeUser, authRoute);
app.use("/api/users", deserializeUser, userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/orders", orderRoute);
app.use("/api/reviews", reviewRoute);

app.listen(port, async () => {
  logger.info(`App is running at localhost://${port}.`);

  await connect();
})