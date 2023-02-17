import express from "express";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";



const server = express();

server.use(express.json());

mongoose.connect(process.env.MONGODB_);

mongoose.connection.on("connected", () => {
  console.log("connected to MongoDB");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server is running on port ${port}`);
  });
});
