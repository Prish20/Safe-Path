import { RequestHandler, Response } from "express";
import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendResetPasswordEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/email.js";

import { Request } from "express";

interface CustomRequest extends Request {
  userId?: string;
}

export const signup: RequestHandler = async (req, res): Promise<void> => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({ error: "User already exists" });
      return;
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = generateVerificationToken();
    const user = new User({
      firstName,
      lastName,
      email,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      password: hashedPassword,
    });

    await user.save();
    generateTokenAndSetCookie(res, user._id.toString());
    await sendVerificationEmail(user.email, verificationToken);
    res.status(201).json({
      message: "User created successfully",
      user: {
        ...user.toObject(),
        password: undefined,
        verificationToken: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

export const verifyEmail: RequestHandler = async (req, res): Promise<void> => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      res.status(400).json({ error: "Invalid or expired verification code" });
      return;
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    await sendWelcomeEmail(user.email, user.firstName);
    res.status(200).json({
      success: true,
      message: "Account verified successfully",
      user: {
        ...user.toObject(),
        password: undefined,
      },
    });
  } catch (error) {
    throw new Error(`Error verifying email: ${error}`);
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid email or password. Please try again.",
      });
      return;
    }
    const isMatch = user.password
      ? bcryptjs.compareSync(password, user.password)
      : false;
    if (!isMatch) {
      res.status(400).json({
        success: false,
        message: "Invalid email or password. Please try again.",
      });
      return;
    }
    generateTokenAndSetCookie(res, user._id.toString());
    user.lastLogin = new Date();
    await user.save();
    res.status(200).json({
      success: true,
      message: "Signin successful",
      user: {
        ...user.toObject(),
        password: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const signout = async (_: any, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Signout successful" });
};

export const forgotPassword: RequestHandler = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "The email does not exist.Please enter the correct email.",
      });
      return;
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = new Date(resetTokenExpiresAt);
    await user.save();
    await sendResetPasswordEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );
    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    res.status(500).json({ success: false, message: (error as any).message });
  }
};

export const resetPassword: RequestHandler = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
      return;
    }
    if (
      !user.resetPasswordExpiresAt ||
      user.resetPasswordExpiresAt.getTime() < Date.now()
    ) {
      res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
      return;
    }
    user.password = bcryptjs.hashSync(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    await sendResetSuccessEmail(user.email);
    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error(`Error resetting password: ${error}`);
    res.status(500).json({ success: false, message: (error as any).message });
  }
};

export const checkAuth: RequestHandler = async (req: CustomRequest, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      res.status(401).json({
        success: false,
        message: "User not found",
      });
      return;
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(`Error checking auth: ${error}`);
    res.status(500).json({ success: false, message: (error as any).message });
  }
};

export const googleSignIn = async (req: Request, res: Response) => {
  const { firstName, lastName, email, photoURL } = req.body;
  try {
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let user = await User.findOne({ email });

    if (user) {
      user.lastLogin = new Date();
      user.photoURL = photoURL || user.photoURL;
      await user.save();
    } else {
      user = new User({
        firstName,
        lastName,
        email,
        photoURL,
        isVerified: true,
        lastLogin: new Date(),
      });
      await user.save();
    }

    generateTokenAndSetCookie(res, user._id.toString());

    return res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      photoURL: user.photoURL,
      isVerified: user.isVerified,
      lastLogin: user.lastLogin,
    });
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    return res.status(500).json({ error: "Authentication failed" });
  }
};
