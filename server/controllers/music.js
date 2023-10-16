import axios from "axios";
import Starred from "../models/Starred.js";
import SpotifyWebApi from "spotify-web-api-node";

export const getProfile = async (req, res, next) => {
  try {
    const starred = await Starred.findOne({ user: req.user.id });

    if (!starred) {
      const newStarred = new Starred({
        video: "",
        artist: "",
        song: "",
        user: req.user.id,
      });
      await newStarred.save();
    }
    return res.status(201).json(starred);
  } catch (err) {
    return next(err);
  }
};

export const getArtist = async (req, res, next) => {
  const artist = req.params.artist;

  const spotifyApi = new SpotifyWebApi({
    clientId: `${process.env.SPOTIFY_CLIENT_ID}`,
    clientSecret: `${process.env.SPOTIFY_CLIENT_SECRET}`,
  });
  const access = await spotifyApi.clientCredentialsGrant();

  // console.log("The access token expires in " + access.body["expires_in"]);
  // console.log("The access token is " + access.body["access_token"]);

  // Save the access token so that it's used in future calls
  spotifyApi.setAccessToken(access.body["access_token"]);

  (err) => {
    console.log("Something went wrong when retrieving an access token", err);
  };
  try {
    const searchArtist = await spotifyApi.searchArtists(artist);
    const artistId = searchArtist.body.artists.items[0].id;

    const response = await Promise.all([
      spotifyApi.getArtist(artistId),
      spotifyApi.getArtistRelatedArtists(artistId),
      spotifyApi.getArtistTopTracks(artistId, "CA"),
    ]);

    const data = response;
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const getVideo = async (req, res, next) => {
  const video = req.params.video;

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&type=video&part=snippet&q=${video}`
    );

    const data = response.data;
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const starVideo = async (req, res, next) => {
  console.log(req.user);
  try {
    const addVideo = await Starred.findOneAndUpdate(
      { user: req.user.id },
      {
        video: req.params.video,
      }
    );
    return res.status(200).json(addVideo);
  } catch (err) {
    return next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};
