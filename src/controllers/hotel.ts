import { Router } from "express";
import { body, param, validationResult } from "express-validator";
import { HotelModel } from "models";
import mongoose from "mongoose";

const router = Router();

router.get("/", async (req, res) => {
  res.json(await HotelModel.find().exec());
});

router.get("/:id", async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    res.json(await HotelModel.findById(req.params.id));
  } else {
    res.status(400).json({
      message: "Invalid hotel ID",
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
  body("hasSpa").isBoolean(),
  body("hasPool").isBoolean(),
  body("priceCategory").isInt({ min: 1, max: 3 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.json(await HotelModel.create(req.body));
  }
);

router.put(
  "/:id",
  param("name").isString().isLength({ min: 2 }),
  async (req, res) => {
    if (mongoose.isValidObjectId(req.params?.id)) {
      res.json(
        await HotelModel.findByIdAndUpdate(
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
        message: "Invalid hotel ID",
      });
    }
  }
);

router.delete("/:id", async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    res.json(await HotelModel.findByIdAndDelete(req.params.id));
  } else {
    res.status(400).json({
      message: "Invalid hotel ID",
    });
  }
});

export default router;
