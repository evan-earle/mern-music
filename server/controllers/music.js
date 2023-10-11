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
  try {
    const spotifyApi = new SpotifyWebApi({
      clientId: `${process.env.SPOTIFY_CLIENT_ID}`,
      clientSecret: `${process.env.SPOTIFY_CLIENT_SECRET}`,
      // redirectUri: "http://localhost:3001/api/music/artist/:artist",
    });
    const access = await spotifyApi.clientCredentialsGrant();

    // const data = whatever.data;

    console.log("The access token expires in " + access.body["expires_in"]);
    console.log("The access token is " + access.body["access_token"]);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(access.body["access_token"]);

    (err) => {
      console.log("Something went wrong when retrieving an access token", err);
    };

    // const response = await Promise.all([
    //   //   // axios.get(
    //   //   //   `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${process.env.LAST_FM_API_KEY}&format=json`
    //   //   // ),
    //   //   // axios.get(
    //   //   //   `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artist}&api_key=${process.env.LAST_FM_API_KEY}&format=json&limit=9`
    //   //   // ),
    //   //   // axios.get(
    //   //   //   `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=${process.env.LAST_FM_API_KEY}&format=json&limit=9`
    //   //   // ),

    // ]);
    const data = await spotifyApi.searchArtists("phora");
    // const data = response.map((response) => response.data);
    console.log(data);
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const getVideo = async (req, res, next) => {
  // const artist = req.params.artist;

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&type=video&part=snippet&q=${song}`
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
