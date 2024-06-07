import { errorHandler } from "../utils/error.js";
const authorize = (route, method) => {
  return async (req, res, next) => {
    return new Promise((resolve, reject) => {
      const user = req.user;
      const isAuthorized = user.roles.some((role) =>
        role.permissions.some(
          (permission) =>
            permission.route === route && permission.method === method
        )
      );
      if (isAuthorized) {
        resolve();
      } else {
        next(errorHandler(403, "Access denied"));
      }
    })
    .then(() => {
      next();
    })
    .catch((error) => {
      next(errorHandler(403, error.message));
    });
  };
};

export default authorize;
