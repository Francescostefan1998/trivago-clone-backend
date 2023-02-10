import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema, model } = mongoose;

const accomodationSchema = new Schema(
  {
    host: { type: Schema.Types.ObjectId, ref: "User", required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    maxGuests: { type: Number, required: true },
    price: { type: Number, required: true },

    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
export default model("Accomodation", accomodationSchema);
