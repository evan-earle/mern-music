import express from "express";
import {
  getUserInfo,
  updateUser,
  updateFirstLogin,
} from "../controllers/users.js";

const router = express.Router();

router.get("/me", getUserInfo);
router.put("/me", updateUser);
router.put("/firstLogin", updateFirstLogin);

export default router;
