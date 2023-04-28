import express from "express";
import config from "config";
import { connect, logger } from "./utils";
import { authRoute, userRoute, gigRoute, conversationRoute, messageRoute, orderRoute, reviewRoute } from "./routes";

const port = config.get<number>("port");

const app = express();

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/orders", orderRoute);
app.use("/api/reviews", reviewRoute);

app.listen(port, async () => {
  logger.info(`App is running at localhost://${port}.`);

  await connect();
})