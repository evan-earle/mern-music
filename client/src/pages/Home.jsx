import { Navbar } from "../components/nav/Navbar";
import { Artist } from "../components/artist/Artist";
import { Youtube } from "../components/youtube/Youtube";
import { TopTracks } from "../components/music/TopTracks";
import { Albums } from "../components/music/albums/Albums";
import { RelatedArtists } from "../components/music/related artists/RelatedArtists";
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
  const [albums, setAlbums] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [mainTracks, setMainTracks] = useState("");
  const [albumTitle, setAlbumTitle] = useState("");
  const [relatedArtists, setRelatedArtists] = useState("");
  const [test, setTest] = useState("");

  const getArtistfromDB = async () => {
    setLoading(true);
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

      const albumArray = data.data[3].body.items;
      const albums = albumArray.map((album) => [
        album.album_type.charAt(0).toUpperCase() + album.album_type.slice(1),
        album.name,
        album.release_date.slice(0, 4),
        album.images[0].url,
        album.id,
      ]);
      setAlbums(albums);

      const relatedArray = data.data[2].body.artists;
      const related = relatedArray
        .map((item) => [item.name, item.images[0].url, item.id])
        .splice(0, 12);

      setRelatedArtists(related);

      setLoading(false);
    } catch (err) {
      toast.error("Artist not found");
      console.log(err);
    }
  };

  useEffect(() => {
    getArtistfromDB();
  }, []);

  useEffect(() => {
    test ? getArtist(test) : null;
  }, [test]);

  return (
    <div>
      <Navbar search={getArtist} />
      <div className={styles.container}>
        <Youtube search={search} />

        {loading ? (
          <PulseLoader
            style={{
              display: "flex",
              justifyContent: "left",
              marginTop: "3rem",
              marginRight: "20rem",
            }}
            color="#00000060"
          />
        ) : (
          <>
            <div className={styles.profileVideo}>
              <Artist artist={artist} artistPhoto={artistPhoto} tags={tags} />
              <TopTracks
                artist={artist}
                topTracks={topTracks}
                video={setSearch}
              />
            </div>
            <div className={styles.tracksAlbums}>
              <div className={styles.secondRow}>
                <MainTracks
                  mainTracks={mainTracks}
                  artist={artist}
                  video={setSearch}
                  albums={albums}
                  albumTitle={albumTitle}
                />

                <div className={styles.albumsRelated}>
                  <Albums
                    artist={artist}
                    albums={albums}
                    mainTracks={setMainTracks}
                    albumTitle={setAlbumTitle}
                  />

                  <RelatedArtists
                    relatedArtists={relatedArtists}
                    test={setTest}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
