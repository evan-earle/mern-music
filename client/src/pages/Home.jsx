import { Navbar } from "../components/nav/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

export const Home = () => {
  const getArtist = async (artist) => {
    try {
      if (artist) {
        const data = await axios.get(`/api/music/artist/${artist}`);
        console.log(data);
      } else {
        const lastSearch = await axios.get(`/api/users/lastSearch`);

        const data = await axios.get(`/api/music/artist/${lastSearch}`);
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getArtist();
  }, []);

  return (
    <div>
      <Navbar search={getArtist} />
    </div>
  );
};
