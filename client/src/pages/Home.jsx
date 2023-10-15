import { Navbar } from "../components/nav/Navbar";
import { Artist } from "../components/artist/Artist";
import { Youtube } from "../components/youtube/Youtube";
import { TopTracks } from "../components/music/TopTracks";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import styles from "./Home.module.css";

export const Home = () => {
  const [artist, setArtist] = useState("");
  const [topTracks, setTopTracks] = useState("");
  const [artistPhoto, setArtistPhoto] = useState("");
  const [tags, setTags] = useState("");
  const [search, setSearch] = useState("");

  const getArtistfromDB = async () => {
    try {
      const lastSearch = await axios.get(`/api/users/lastSearch`);
      console.log(lastSearch);
      const artist = lastSearch.data.lastSearch;
      getArtist(artist);
    } catch (err) {
      console.log(err);
    }
  };

  const getArtist = async (artist) => {
    try {
      const data = await axios.get(`/api/music/artist/${artist}`);
      console.log(data);

      setArtist(data.data[0].body.name);

      // //Getting artist bio and cutting out the href link
      // setDescription(data.data[0].artist.bio.summary.split("<")[0]);
      setArtistPhoto(data.data[0].body.images[0].url);

      //Getting array of tags, mapping to a new array, and joining them into a string
      const artistTags = data.data[0].body.genres.slice(0, 4);
      const tags = artistTags.join(" / ");
      setTags(tags);

      const topTracksArray = data.data[2].body.tracks;
      const topTracks = topTracksArray.map((track) => track.name).slice(0, 7);
      setTopTracks(topTracks);
    } catch (err) {
      toast.error("Artist not found");
      console.log(err);
    }
  };

  useEffect(() => {
    getArtistfromDB();
  }, []);

  return (
    <div>
      <Navbar search={getArtist} />
      <div className={styles.profileVideo}>
        <Artist artist={artist} artistPhoto={artistPhoto} tags={tags} />
        <TopTracks artist={artist} topTracks={topTracks} video={setSearch} />
        <Youtube search={search} />
      </div>
    </div>
  );
};
