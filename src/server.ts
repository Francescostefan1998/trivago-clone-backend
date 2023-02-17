import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
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

const server = express();
const port = process.env.PORT || 3001;
//passport.use("google", googleStrategy);

server.use(cors());
server.use(express.json());
//server.use(passport.initialize());

server.use("/users", userRouter);
//server.use("/accomodations", accomodationRouter);

server.use(unauthorizedErrorHandler);
server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);
mongoose.connect(process.env.MONGO_URL!);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server is running on port ${port}`);
  });
});
