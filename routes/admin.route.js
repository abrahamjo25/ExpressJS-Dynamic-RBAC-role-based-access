import express from "express";
import authenticate from "../middleware/auth.middleware";
import authorize from "../middleware/authorize.middleware";
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
} from "../controllers/admin.controller";

const router = express.Router();

//Roles
router.get(
  "/roles",
  authenticate,
  authorize("/api/auth/roles", "GET"),
  getRoles
);

router.get(
  "/role:id",
  authenticate,
  authorize("/api/auth/role/:id", "GET"),
  getRolesById
);

router.post(
  "/role",
  authenticate,
  authorize("/api/auth/role", "POST"),
  createRole
);

router.put(
  "/role/:id",
  authenticate,
  authorize("/api/auth/role/:id", "PUT"),
  updateRoles
);

router.delete(
  "/role/:id",
  authenticate,
  authorize("/api/auth/role/:id", "DELETE"),
  deleteRole
);

//Permissions
router.get(
  "/permission",
  authenticate,
  authorize("/api/auth/permission", "GET"),
  getPermissions
);

router.get(
  "/permission:id",
  authenticate,
  authorize("/api/auth/permission/:id", "GET"),
  getPermissionsById
);

router.post(
  "/permission",
  authenticate,
  authorize("/api/auth/permission", "POST"),
  createPermissions
);

router.put(
  "/permission/:id",
  authenticate,
  authorize("/api/auth/permission/:id", "PUT"),
  updatePermissions
);

router.delete(
  "/permission/:id",
  authenticate,
  authorize("/api/auth/permission/:id", "DELETE"),
  deletePermissions
);
