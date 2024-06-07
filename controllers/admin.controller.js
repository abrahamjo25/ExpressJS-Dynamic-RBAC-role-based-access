import Role from "../models/role.models.js";
import Permission from "../models/permission.models.js";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.models.js";

export const getRoles = async (req, res, next) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (err) {
    next(err);
  }
};

export const getRolesById = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    next(errorHandler(400, "Role id is required"));
  }
  try {
    const role = await Role.findById(id);
    res.status(200).json(role);
  } catch (err) {
    next(err);
  }
};

export const createRole = async (req, res, next) => {
  const { name, permissions } = req.body;
  const role = new Role({ name, permissions });

  if (!name) {
    next(errorHandler(400, "Role name is required"));
  }
  try {
    await role.save();
    res.status(201).json({
      payload: role,
      success: true,
      message: `Role saved successfully`,
    });
  } catch (err) {
    next(err);
  }
};
export const updateRoles = async (req, res, next) => {
  const { name, permissions } = req.body;
  const { id } = req.params;

  if (!id) {
    next(errorHandler(400, "Role id is required"));
  }
  if (!name) {
    next(errorHandler(400, "Role name is required"));
  }

  try {
    const role = await Role.findByIdAndUpdate(
      id,
      { name, permissions },
      { new: true }
    );
    res.status(200).json({
      payload: role,
      success: true,
      message: `Role updated successfully`,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteRole = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(errorHandler(400, "Role id is required"));
  }
  try {
    const role = await Role.findByIdAndDelete(id);
    res.status(200).json({
      payload: role,
      success: true,
      message: `Role deleted successfully`,
    });
  } catch (err) {
    next(err);
  }
};

export const getPermissions = async (req, res, next) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json(permissions);
  } catch (err) {
    next(err);
  }
};

export const getPermissionsById = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(errorHandler(400, "Permission id is required"));
  }

  try {
    const permission = await Permission.findById(id);
    res.status(200).json(permission);
  } catch (err) {
    next(err);
  }
};
export const createPermissions = async (req, res, next) => {
  const { name, route, method } = req.body;

  const permission = new Permission({ name, route, method });

  try {
    await permission.save();
    res.status(201).json({
      payload: permission,
      success: true,
      message: `Permission saved successfully`,
    });
  } catch (err) {
    next(err);
  }
};

export const updatePermissions = async (req, res, next) => {
  const { name, route, method } = req.body;
  const { id } = req.params;
  if (!id) {
    next(errorHandler(400, "Permission id is required"));
  }
  try {
    const permision = await Permission.findByIdAndUpdate(
      id,
      { name, route, method },
      { new: true }
    );
    res.status(201).json({
      payload: permision,
      success: true,
      message: `Permission updated successfully`,
    });
  } catch (err) {
    next(err);
  }
};

export const deletePermissions = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(errorHandler(400, "Permission id is required"));
  }
  try {
    const permision = await Permission.findByIdAndDelete(id);
    res.status(200).json({
      payload: permision,
      success: true,
      message: `Permission deleted successfully`,
    });
  } catch (err) {
    next(err);
  }
};

export const assignRoles = async (req, res, next) => {
  const { id } = req.params;
  const { roles } = req.body;
  if (!id) {
    next(errorHandler(400, "User id is required"));
  }
  if (!roles) {
    next(errorHandler(400, "Roles are required"));
  }
  try {
    const user = await User.findByIdAndUpdate(id, { roles }, { new: true });

    const { password, ...userdata } = user._doc;
    res.status(200).json({
      payload: userdata,
      success: true,
      message: `Roles assigned successfully`,
    });
  } catch (err) {
    next(err);
  }
};
