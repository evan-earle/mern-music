import express from "express";
import {
  getUserInfo,
  updateUser,
  updateFirstLogin,
  updateLastSearch,
  getLastSearch,
} from "../controllers/users.js";

const router = express.Router();

router.get("/me", getUserInfo);
router.get("/lastSearch", getLastSearch);
router.put("/me", updateUser);
router.put("/firstLogin", updateFirstLogin);
router.put("/lastSearch/:artist", updateLastSearch);

export default router;
