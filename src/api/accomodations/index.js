import express from "express";
import createHttpError from "http-errors";
import passport from "passport";
import { JWTAuthMiddleware } from "../../lib/auth/jwtAuth.js";
import { createAccessToken } from "../../lib/auth/tools.js";
import { hostOnlyMiddleware } from "../../lib/auth/hostOnly.js";

import googleStrategy from "../../lib/auth/google.js";
import AccomodationModel from "./model.js";
const accomodationRouter = express.Router();

accomodationRouter.post(
  "/",
  JWTAuthMiddleware,
  hostOnlyMiddleware,
  async (req, res, next) => {
    try {
      console.log("POST");
      const newAcc = new AccomodationModel(req.body);
      const { _id } = await newAcc.save();
      res.status(201).send({ _id });
    } catch (error) {
      next(error);
    }
  }
);
/*accomodationRouter.get("/", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const accomodations = await AccomodationModel.find();
    res.send(accomodations);
  } catch (error) {
    next(error);
  }
});*/

accomodationRouter.get("/", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const maxPrice = req.query.maxPrice;
    const city = req.query.city;
    const minPrice = req.query.minPrice;

    let query = AccomodationModel.find();

    if (maxPrice) {
      query = query.where("price").lte(maxPrice);
    }

    if (city) {
      query = query.where("city").equals(city);
    }

    if (minPrice) {
      query = query.where("price").gte(minPrice);
    }

    const accomodations = await query.exec();
    res.send(accomodations);
  } catch (error) {
    next(error);
  }
});
export default accomodationRouter;
