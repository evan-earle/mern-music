import { Navbar } from "../components/nav/Navbar";
import { Artist } from "../components/artist/Artist";
import { useState, useEffect } from "react";
import axios from "axios";

export const Home = () => {
  const [artist, setArtist] = useState("");
  const [description, setDescription] = useState("");
  const [artistPhoto, setArtistPhoto] = useState("");
  const [tags, setTags] = useState("");

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

      setArtist(data.data[0].artist.name);

      //Getting artist bio and cutting out the href link
      setDescription(data.data[0].artist.bio.summary.split("<")[0]);
      setArtistPhoto(data.data[2].topalbums.album[0].image[3]["#text"]);

      //Getting array of tags, mapping to a new array, and joining them into a string
      const artistTags = data.data[0].artist.tags.tag;
      const artistTagsArray = artistTags.map((tag) => tag.name);
      const tags = artistTagsArray.join(" / ");
      setTags(tags);
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
      <Artist
        artist={artist}
        description={description}
        artistPhoto={artistPhoto}
        tags={tags}
      />
    </div>
  );
};
