import { model, Schema } from "mongoose";

interface Restaurant {
  name: string;
  address: string;
  city: string;
  country: string;
  stars: number;
  cuisine: string;
  priceCategory: number;
}

export const RestaurantModel = model(
  "Restaurant",
  new Schema<Restaurant>({
    name: String,
    address: String,
    city: String,
    country: String,
    stars: {
      type: Number,
      min: 1,
      max: 5,
    },
    cuisine: String,
    priceCategory: {
      type: Number,
      min: 1,
      max: 3,
    },
  })
);
