// src/routes/user.route.js

import express from "express";

import {
  registerUser,
  loginUser,
  searchUsers,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public route
router.post("/", registerUser);
router.get("/", loginUser);
router.get("/search", verifyJWT, searchUsers);


export default router;