import express from "express";

import { getVideo } from "../controllers/music.js";

const router = express.Router();

router.get("/", getVideo);

export default router;
