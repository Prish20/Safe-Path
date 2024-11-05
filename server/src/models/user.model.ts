import mongoose from "mongoose";

const userSchema =  new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  photoURL: {
    type: String,
  },
  password: {
    type: String,
    // required: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpiresAt: {
    type: Date,
  },
  verificationToken: {
    type: String,
  },
  verificationTokenExpiresAt: {
    type: Date,
  },
}, {timestamps: true});

export const User = mongoose.model("User", userSchema);
