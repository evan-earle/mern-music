import express from "express";
import { register, login, logout, isLoggedIn } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/is_logged_in", isLoggedIn);

export default router;
