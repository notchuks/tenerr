import express from "express";
import config from "config";

const app = express();

app.listen(1337, () => {
  console.log("App is running.");
})