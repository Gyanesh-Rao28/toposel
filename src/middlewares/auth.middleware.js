// src/middlewares/auth.middleware.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authJWT = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid access token",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "Invalid access token",
    });
  }
};
