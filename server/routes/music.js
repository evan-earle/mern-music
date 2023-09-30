import express from "express";

import {
  starVideo,
  deleteVideo,
  getProfile,
  getArtist,
} from "../controllers/music.js";

const router = express.Router();

router.get("/", getProfile);
router.get("/artist/:artist", getArtist);
router.post("/add/:video", starVideo);
router.delete("/delete", deleteVideo);

export default router;
