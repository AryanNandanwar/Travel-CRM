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
import { verifyJWT }  from "../middleware/auth.middleware.js";
import { authorize }  from "../middleware/roles.middleware.js";

const router = Router();

// ─── Public ──────────────────────────────────────────────────
router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken);

// ─── Protected ────────────────────────────────────────────────
// All routes below require a valid JWT
router.use(verifyJWT);

// Logout, password, account—any authenticated user
router.route("/logout").post(logoutUser);
router.route("/change-password").post(changeCurrentPassword);
router.route("/current-user").get(getCurrentUser);
router.route("/update-account").patch(updateAccountDetails);

// ─── Admin-only ───────────────────────────────────────────────
// All routes below require both a valid JWT *and* `role === 'admin'`
router.use(authorize("admin"));

// Now the “register” endpoint is admin-only
router.route("/register").post(registerUser);

// User management: list, create, read, update, delete
router
  .route("/users")
  .get(getAllUsers);

router
  .route("/users/:userId")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

export default router;
