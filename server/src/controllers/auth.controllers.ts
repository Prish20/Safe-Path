import { RequestHandler, Response } from 'express';
import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { generateVerificationToken } from '../utils/generateVerificationToken.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail } from '../mailtrap/email.js';

export const signup: RequestHandler = async (req, res): Promise<void> => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({ error: "All fields are required" });
    }
    const userExist = await User.findOne({email})
    if (userExist) {
      res.status(400).json({error: "User already exists"})
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = generateVerificationToken();
    const user = new User({
      firstName,
      lastName,
      email,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      password: hashedPassword
    });

    await user.save();
    generateTokenAndSetCookie(res, user._id);
    await sendVerificationEmail(user.email, verificationToken);
    res.status(201).json({
      message: "User created successfully",
      user: {
        ...user.toObject(),
        password: undefined
      }
    });
  } catch (error) {
    res.status(400).json({error: "Something went wrong"})
  }
};

export const signin = async (req: any, res: Response) => {
  res.send("Signin route");
};

export const signout = async (req: any, res: Response) => {
  res.send("Signout route");
};
