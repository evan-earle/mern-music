import express from "express";

import {
  getVideo,
  starVideo,
  deleteVideo,
  getProfile,
  getArtist,
  getStarred,
} from "../controllers/music.js";

const router = express.Router();

router.get("/", getProfile);
router.get("/video/:video", getVideo);
router.get("/artist/:artist", getArtist);
router.get("/starred", getStarred);
router.post("/add/:video", starVideo);
router.delete("/delete/:video", deleteVideo);

export default router;
