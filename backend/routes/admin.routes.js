import { Router } from "express";
import { 
  loginUser, 
  logoutUser, 
  registerUser, 
  refreshAccessToken, 
  changeCurrentPassword, 
  getCurrentUser, 
  updateAccountDetails,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById
} from "../controllers/admin.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// ─── Public ──────────────────────────────────────────────────
router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/register").post(registerUser);


// ─── Authenticated ────────────────────────────────────────────
router.use(verifyJWT);

router.route("/logout").post(logoutUser);
router.route("/change-password").post(changeCurrentPassword);
router.route("/current-user").get(getCurrentUser);
router.route("/update-account").patch(updateAccountDetails);

// ─── Admin-only ───────────────────────────────────────────────
// router.use(authorize("admin"));

// Create & list users
router
  .route("/users")    // reuse your existing registerUser
  .get(getAllUsers);

// Single-user operations
router
  .route("/users/:userId")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

export default router;
