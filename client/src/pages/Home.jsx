import { Navbar } from "../components/nav/Navbar";
import { Artist } from "../components/artist/Artist";
import { Youtube } from "../components/youtube/Youtube";
import { TopTracks } from "../components/music/TopTracks";
import { Albums } from "../components/music/Albums";
import { RelatedArtists } from "../components/music/RelatedArtists";
import { MainTracks } from "../components/music/MainTracks";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import styles from "./Home.module.css";
import PulseLoader from "react-spinners/PulseLoader";

export const Home = () => {
  const [artist, setArtist] = useState("");
  const [topTracks, setTopTracks] = useState("");
  const [artistPhoto, setArtistPhoto] = useState("");
  const [tags, setTags] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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

      const topTracksArray = data.data[1].body.tracks;

      const topTracks = topTracksArray
        .map((track) => [track.name, track.id])
        .slice(0, 7);
      setTopTracks(topTracks);
      setLoading(false);
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
      {loading ? (
        <PulseLoader
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "3rem",
          }}
          color="#00000060"
        />
      ) : (
        <div>
          <div className={styles.profileVideo}>
            <Artist artist={artist} artistPhoto={artistPhoto} tags={tags} />
            <TopTracks
              artist={artist}
              topTracks={topTracks}
              video={setSearch}
            />
            <Youtube search={search} />
          </div>
          <div className={styles.albumsRelated}>
            <MainTracks />
            <Albums artist={artist} video={setSearch} />
            <RelatedArtists />
          </div>
        </div>
      )}
    </div>
  );
};
