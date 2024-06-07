const authorize = async (route, method) => {
  return (req, res, next) => {
    const user = req.user;
    const isAuthorized = user.roles.some((role) =>
      role.permissions.some(
        (permission) =>
          permission.route === route && permission.method === method
      )
    );
    if (isAuthorized) {
      next();
    }else{
        next(errorHandler(403,"Access denied"));
    }
  };
};
export default authorize;