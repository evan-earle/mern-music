import express from "express";

import { getVideo, starVideo, deleteVideo } from "../controllers/music.js";

const router = express.Router();

router.get("/:song", getVideo);
router.post("/add", starVideo);
router.delete("/delete", deleteVideo);

export default router;
