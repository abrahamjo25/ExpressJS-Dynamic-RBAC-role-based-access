import User from "../models/user.models.js";
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

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const user = await User.findOne({ email });

      if (user) {
        if (bcryptjs.compareSync(password, user.password)) {
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          const { password: pass, ...userData } = user._doc;

          res.status(200).json({token, userData});
        } else {
          next(errorHandler(400, "Invalid password"));
        }
      } else {
        next(errorHandler(400, "Invalid username"));
      }
    } catch (err) {
      next(err);
    }
  } else {
    next(errorHandler(400, "Fill all required fields"));
  }
};
