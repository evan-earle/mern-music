import express from "express";

import {
  getVideo,
  starVideo,
  deleteVideo,
  getProfile,
} from "../controllers/music.js";

const router = express.Router();

router.get("/", getProfile);
router.get("/:song", getVideo);
router.post("/add/:video", starVideo);
router.delete("/delete", deleteVideo);

export default router;
