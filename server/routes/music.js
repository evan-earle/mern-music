import express from "express";

import {
  getVideo,
  starVideo,
  deleteVideo,
  getProfile,
  getArtist,
} from "../controllers/music.js";

const router = express.Router();

router.get("/", getProfile);
router.get("/video/:song", getVideo);
router.get("/artist/:artist", getArtist);
router.post("/add/:video", starVideo);
router.delete("/delete", deleteVideo);

export default router;