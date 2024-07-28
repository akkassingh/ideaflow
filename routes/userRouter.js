import { Router } from "express";
import { getApplicationStats, getCurrentUser, updateUser, getAllUsers, getUserById, getUserByEmail } from "../controllers/userController.js";
const router = Router();

import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import { authorizePermissions, checkForTestUser, authenticateUser } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

router.get("/current-user", getCurrentUser);

// only 'admin' role has authority to use this path
router.get(
  "/admin/app-stats",[
    // authorizePermissions("admin"),
    getApplicationStats,
  ]);

router.patch(
  "/update-user",
  checkForTestUser,
  upload.single("avatar"),
  validateUpdateUserInput,
  updateUser
);

router.get("/", authenticateUser, getAllUsers);
router.get("/:id", authenticateUser, getUserById);
router.get("/email/:email", authenticateUser, getUserByEmail);

export default router;
