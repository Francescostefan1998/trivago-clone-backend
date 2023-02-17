/*import createHttpError from "http-errors";

export const hostOnlyMiddleware = (req, res, next) => {
  console.log(req.user);
  if (req.user.role === "Host") {
    next();
  } else {
    next(createHttpError(403, "Host only endpoint!"));
  }
};
*/