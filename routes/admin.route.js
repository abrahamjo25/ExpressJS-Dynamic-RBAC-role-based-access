import express from "express";
import authenticate from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import {
  createPermissions,
  createRole,
  deleteRole,
  deletePermissions,
  getPermissions,
  getPermissionsById,
  getRoles,
  getRolesById,
  updateRoles,
  updatePermissions,
  assignRoles,
} from "../controllers/admin.controller.js";

const router = express.Router();

//Roles
router.get(
  "/roles",
  // authenticate,
  // authorize("/api/admin/roles", "GET"),
  getRoles
);

router.get(
  "/role/:id",
  // authenticate,
  // authorize("/api/admin/role/:id", "GET"),
  getRolesById
);

router.post(
  "/role",
  // authenticate,
  // authorize("/api/admin/role", "POST"),
  createRole
);

router.put(
  "/role/:id",
  authenticate,
  authorize("/api/admin/role/:id", "PUT"),
  updateRoles
);

router.delete(
  "/role/:id",
  authenticate,
  authorize("/api/admin/role/:id", "DELETE"),
  deleteRole
);

//Permissions
router.get(
  "/permission",
  // authenticate,
  // authorize("/api/admin/permission", "GET"),
  getPermissions
);

router.get(
  "/permission/:id",
  authenticate,
  authorize("/api/admin/permission/:id", "GET"),
  getPermissionsById
);

router.post(
  "/permission",
  authenticate,
  authorize("/api/admin/permission", "POST"),
  createPermissions
);

router.put(
  "/permission/:id",
  authenticate,
  authorize("/api/admin/permission/:id", "PUT"),
  updatePermissions
);

router.delete(
  "/permission/:id",
  authenticate,
  authorize("/api/admin/permission/:id", "DELETE"),
  deletePermissions
);

router.post(
  "/assign-roles/:id",
  // authenticate,
  // authorize("/api/admin/assign-roles", "POST"),
  assignRoles
);

export default router;
