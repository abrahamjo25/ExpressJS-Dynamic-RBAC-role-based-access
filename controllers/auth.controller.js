import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

import jwt from "jsonwebtoken";
export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (username && email && password) {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    try {
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      next(error);
    }
  } else {
    next(errorHandler(400, "Fill all required fields"));
  }
};