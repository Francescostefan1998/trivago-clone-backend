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
const expressServer = express();

// ************************************ SOCKET.IO ********************************
const httpServer = createServer(expressServer);

expressServer.use(cors());
expressServer.use(express.json());
//.use(passport.initialize());

expressServer.use("/users", userRouter);
//.use("/accomodations", accomodationRouter);

expressServer.use(unauthorizedErrorHandler);
expressServer.use(badRequestHandler);
expressServer.use(notFoundHandler);
expressServer.use(genericErrorHandler);

export { httpServer, expressServer };
