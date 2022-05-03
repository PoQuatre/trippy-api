import { HotelRouter, RestaurantRouter } from "controllers";
import { config as dotenv } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";

dotenv();

if (!process.env.MONGO_URL) {
  throw new Error("The environment variable `MONGO_URL` was not set!");
}

const PORT = process.env.PORT || 3000;
const app = express();

mongoose.connect(process.env.MONGO_URL);

app.use(morgan("common"));
app.use(express.json());

app.use("/hotels", HotelRouter);
app.use("/restaurants", RestaurantRouter);

app.listen(PORT, () => {
  console.log(`The server is now listening on http://localhost:${PORT}`);
});
