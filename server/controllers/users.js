import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import createError from "../utils/createError.js";

export const getUserInfo = async (req, res, next) => {
  try {
    const data = await User.findById(req.user.id).select("username");
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return next(createError({ status: 401, message: "User already exists" }));
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        username: req.body.username,
        password: hashedPassword,
      },
      {
        new: true,
      }
    ).select("username password");

    return res.status(200).json(updatedUser);
  } catch (err) {
    return next(err);
  }
};
