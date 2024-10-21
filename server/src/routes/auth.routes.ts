import express from "express";
import {
  forgotPassword,
  signin,
  signout,
  signup,
  verifyEmail,
  resetPassword,
} from "../controllers/auth.controllers.js";

const router = express.Router();

// Authentication routes
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
