import { RequestHandler, Request } from "express";
import jwt from "jsonwebtoken";

// Extend the Express Request interface to include userId
interface CustomRequest extends Request {
  userId?: string;
}

export const verifyToken: RequestHandler = (req: CustomRequest, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({
      success: false,
      message: "Unauthorized. Please login.",
    });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decoded === "string" || !decoded) {
      res.status(401).json({
        success: false,
        message: "Unauthorized. Please login.",
      });
      return;
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized. Please login.",
    });
  }
};
