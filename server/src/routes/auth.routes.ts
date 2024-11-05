import express from "express";
import {
  forgotPassword,
  signin,
  signout,
  signup,
  verifyEmail,
  resetPassword,
  checkAuth,
  googleSignIn,
} from "../controllers/auth.controllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// Check auth status route
router.get("/check-auth", verifyToken, checkAuth);

// Authentication routes
router.post("/signup", signup);
router.post("/signin", signin as unknown as express.RequestHandler);
router.post("/google", googleSignIn as unknown as express.RequestHandler);
router.post("/signout", signout as unknown as express.RequestHandler);
router.post("/verify-email", verifyEmail as unknown as express.RequestHandler);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
