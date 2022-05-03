import { Router } from "express";
import { body, param, validationResult } from "express-validator";
import { RestaurantModel } from "models";
import mongoose from "mongoose";

const router = Router();

router.get("/", async (req, res) => {
  res.json(await RestaurantModel.find().exec());
});

router.get("/:id", async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    res.json(await RestaurantModel.findById(req.params.id));
  } else {
    res.status(400).json({
      message: "Invalid restaurant ID",
    });
  }
});

router.post(
  "/",
  body("name").isString().isLength({ min: 2 }),
  body("address").isString().isLength({ min: 2 }),
  body("city").isString().isLength({ min: 2 }),
  body("country").isString().isLength({ min: 2 }),
  body("stars").isInt({ min: 1, max: 5 }),
  body("cuisine").isString().isLength({ min: 2 }),
  body("priceCategory").isInt({ min: 1, max: 3 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.json(await RestaurantModel.create(req.body));
  }
);

router.put(
  "/:id",
  param("name").isString().isLength({ min: 2 }),
  async (req, res) => {
    if (mongoose.isValidObjectId(req.params?.id)) {
      res.json(
        await RestaurantModel.findByIdAndUpdate(
          req.params?.id,
          {
            $set: {
              name: req.query?.name,
            },
          },
          { new: true }
        )
      );
    } else {
      res.status(400).json({
        message: "Invalid restaurant ID",
      });
    }
  }
);

router.delete("/:id", async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    res.json(await RestaurantModel.findByIdAndDelete(req.params.id));
  } else {
    res.status(400).json({
      message: "Invalid restaurant ID",
    });
  }
});

export default router;
