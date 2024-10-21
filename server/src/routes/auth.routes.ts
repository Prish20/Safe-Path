import express from "express";
import {
  forgotPassword,
  signin,
  signout,
  signup,
  verifyEmail,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

export default router;
