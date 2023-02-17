import mongoose from "mongoose";
import { ErrorRequestHandler } from "express";
export const unauthorizedErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  if (err.status === 401) {
    res.status(401).send({ success: false, message: err.message });
  } else {
    next(err);
  }
};

export const badRequestHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.status === 400 || err instanceof mongoose.Error.ValidationError) {
    res.status(400).send({ message: err.message });
  } else if (err instanceof mongoose.Error.CastError) {
    res.status(400).send({ message: "Wrong Id" });
  } else {
    next(err);
  }
};
export const notFoundHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ message: err.message });
  } else {
    next();
  }
};
export const genericErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  console.log(err);
  res.status(500).send({ message: "Generic server error" });
};
