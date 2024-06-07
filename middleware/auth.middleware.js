import { jwt } from "jsonwebtoken";
import User from "../models/user.models.js";
import { errorHandler } from "../utils/error.js";
import Permission from "../models/permission.models.js";

const authenticate = async (req, res, next) => {
  try {
    const permission = await Permission.findOne({
      route: req.path,
      method: req.method,
    });

    if (!permission) {
      next(errorHandler(404, "Route not found"));
    }

    if (!permission.requiresAuth) {
      return next();
    }
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      next(errorHandler(402, "Access Denied"));
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(verified._id).populate({
      path: "roles",
      populate: {
        path: "permissions",
      },
    });
    next();
  } catch (error) {
    next(errorHandler(400, "Invalid token"));
  }
};

export default authenticate;
