import express from "express";

import {
  getVideo,
  starVideo,
  deleteVideo,
  getProfile,
  getArtist,
  getStarred,
  getAlbum,
  getStarredPlaylist,
} from "../controllers/music.js";

const router = express.Router();

router.get("/", getProfile);
router.get("/video/:video", getVideo);
router.get("/artist/:artist", getArtist);
router.get("/album/:album", getAlbum);
router.get("/starred", getStarred);
router.get("/starredPlaylist/:tracks", getStarredPlaylist);
router.post("/add/:video", starVideo);
router.delete("/delete/:video", deleteVideo);

export default router;
