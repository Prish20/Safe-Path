import express from "express";
import {
  forgotPassword,
  signin,
  signout,
  signup,
  verifyEmail,
  resetPassword,
  checkAuth
} from "../controllers/auth.controllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// Check auth status route
router.get("/check-auth", verifyToken, checkAuth);

// Authentication routes
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
