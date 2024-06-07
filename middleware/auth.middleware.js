import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import { errorHandler } from "../utils/error.js";
import Permission from "../models/permission.models.js";

const authenticate = async (req, res, next) => {
  try {
    const fullPath = `${req.baseUrl}${req.path}`;
    const permission = await Permission.findOne({
      route: fullPath,
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
      next(errorHandler(402, "User not authenticated"));
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
