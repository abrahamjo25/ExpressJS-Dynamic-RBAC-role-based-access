import express from "express";
import authenticate from "../middleware/auth.middleware";
import authorize from "../middleware/authorize.middleware";
import { createPermissions, createRole } from "../controllers/admin.controller";
const router = express.Router();


//Roles
router.post("/role", authenticate, authorize("/user/role", "POST"), createRole);
router.get("/role", authenticate, authorize("/user/role", "GET"), getRole);
router.put("/role", authenticate, authorize("/user/role", "PUT"), updateRole);
router.delete("/role", authenticate, authorize("/user/role", "DELETE"), deleteRole);

//Permissions
router.post(
  "/permission",
  authenticate,
  authorize("/user/permission", "POST"),
  createPermissions
);
