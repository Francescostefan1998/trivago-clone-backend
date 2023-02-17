import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import { createServer } from "http";
import mongoose from "mongoose";
import passport from "passport";
import {
  unauthorizedErrorHandler,
  badRequestHandler,
  notFoundHandler,
  genericErrorHandler,
} from "./errorHandlers";
import userRouter from "./api/users";
//import accomodationRouter from "./api/accomodations";
//import googleStrategy from "./lib/auth/google";

//passport.use("google", googleStrategy);
const server = express();
// ************************************ SOCKET.IO ********************************

server.use(cors());
server.use(express.json());
//.use(passport.initialize());

server.use("/users", userRouter);
//.use("/accomodations", accomodationRouter);

server.use(unauthorizedErrorHandler);
server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

export default server;
