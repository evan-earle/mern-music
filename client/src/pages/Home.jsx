import { Navbar } from "../components/nav/Navbar";
import { Artist } from "../components/artist/Artist";
import { useState, useEffect } from "react";
import axios from "axios";

export const Home = () => {
  const [artist, setArtist] = useState("");

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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getArtistfromDB();
  }, []);

  return (
    <div>
      <Navbar search={getArtist} />
      <Artist />
    </div>
  );
};
