import Permission from "../models/permission.models.js";
import { errorHandler } from "../utils/error.js";
const authorize = (route, method) => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      const permission = await Permission.findOne({
        route: route,
        method: method,
      });
      if (!permission) {
        return next(errorHandler(404, "Route not found"));
      }
      const isAuthorized = user.roles.some((role) =>
        role.permissions.some(
          (perm) => perm.route === route && perm.method === method
        )
      );
      if (isAuthorized) {
        next();
      } else {
        next(
          errorHandler(403, "User has no access to the requested resource.")
        );
      }
    } catch (err) {
      next(err);
    }
  };
};

export default authorize;
