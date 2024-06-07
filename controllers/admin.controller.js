import Role from "../models/role.models.js";
import Permission from "../models/permission.models.js";
export const createRole = async (req, res, next) => {
  const { name, permissions } = req.body;
  const role = new Role({ name, permissions });

  try {
    await role.save();
    res
      .status(201)
      .json(role, { success: true, message: `Role saved successfully` });
  } catch (err) {
    next(err);
  }
};

export const createPermissions = async (req, res, next) => {
  const { name, route, method } = req.body;

  const permission = new Permission({ name, route, method });

  try {
    await permission.save();
    res
     .status(201)
     .json(permission, { success: true, message: `Permission saved successfully` });
  } catch (err) {
    next(err);
  }
};
