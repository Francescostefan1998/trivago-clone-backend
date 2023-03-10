import express from "express";
import createHttpError from "http-errors";
import passport from "passport";
import { JWTAuthMiddleware } from "../../lib/auth/jwtAuth";
import { createAccessToken } from "../../lib/auth/tools";
//import googleStrategy from "../../lib/auth/google";

import UsersModel from "./model";
const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
  try {
    console.log("POST");
    const newUser = new UsersModel(req.body);
    console.log(newUser);
    const { _id } = await newUser.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await UsersModel.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
}); /*
userRouter.get(
  "/googleLogin",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
userRouter.get(
  "/googleRedirect",
  passport.authenticate("google", { session: false }),
  async (req, res, next) => {
    console.log(req.user);
    //res.send({ accessToken: req.user.accessToken });
    res.redirect(`${process.env.FE_URL}?accessToken=${req.user.accessToken!}`);
  }
);

userRouter.put("/me", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const updatedUser = await UsersModel.findByIdAndUpdate(
      req.user._id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});
userRouter.delete("/me", JWTAuthMiddleware, async (req, res, next) => {
  try {
    await UsersModel.findByIdAndUpdate(req.user._id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});*/

userRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UsersModel.checkCredentials(email, password);

    if (user) {
      const payload = { _id: user._id, role: user.role };

      const accessToken = await createAccessToken(payload);
      res.send({ accessToken });
    } else {
      next(createHttpError(401, "Credentials are not ok!"));
    }
  } catch (error) {
    next(error);
  }
});

export default userRouter;
