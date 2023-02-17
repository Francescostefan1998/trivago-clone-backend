import express from "express";
import createHttpError from "http-errors";
import passport from "passport";
import { JWTAuthMiddleware } from "../../lib/auth/jwtAuth";
import { createAccessToken } from "../../lib/auth/tools";
import { hostOnlyMiddleware } from "../../lib/auth/hostOnly";

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
      const newAcc = new AccomodationModel({
        ...req.body,
        host: req.user._id,
      });
      console.log(newAcc);
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
      query = query.where("city").regex(new RegExp(city, "i"));
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

accomodationRouter.get(
  "/:accomodationId",
  JWTAuthMiddleware,
  async (req, res, next) => {
    try {
      const accomodation = await AccomodationModel.findById(
        req.params.accomodationId
      );
      if (accomodation) {
        res.send(accomodation);
      } else {
        next(
          createHttpError(
            404,
            `Accomodation wit id ${req.params.accomodationId} not found`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);
accomodationRouter.put(
  "/:accomodationId",
  JWTAuthMiddleware,
  hostOnlyMiddleware,
  async (req, res, next) => {
    try {
      const updateAuthors = await AccomodationModel.findByIdAndUpdate(
        req.params.accomodationId,
        req.body,
        { new: true, runValidators: true }
      );
      if (updateAuthors) {
        res.send(updateAuthors);
      } else {
        next(
          createHttpError(
            404,
            `accomodation wit id ${req.params.accomodationId} not found`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

accomodationRouter.delete(
  "/:accomodationId",
  JWTAuthMiddleware,
  hostOnlyMiddleware,
  async (req, res, next) => {
    try {
      const deleteUser = await AccomodationModel.findByIdAndDelete(
        req.params.accomodationId
      );
      if (deleteUser) {
        res.status(204).send("deleted");
      } else {
        next(
          createHttpError(
            404,
            `accomodation wit id ${req.params.accomodationId} not found`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

export default accomodationRouter;
