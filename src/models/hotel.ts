import { model, Schema } from "mongoose";

interface Hotel {
  name: string;
  address: string;
  city: string;
  country: string;
  stars: number;
  hasSpa: boolean;
  hasPool: boolean;
  priceCategory: number;
}

export const HotelModel = model(
  "Hotel",
  new Schema<Hotel>({
    name: String,
    address: String,
    city: String,
    country: String,
    stars: {
      type: Number,
      min: 1,
      max: 5,
    },
    hasSpa: Boolean,
    hasPool: Boolean,
    priceCategory: {
      type: Number,
      min: 1,
      max: 3,
    },
  })
);
