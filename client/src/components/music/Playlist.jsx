import { useState, useEffect } from "react";
import styles from "./Playlist.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "animate.css";
import PulseLoader from "react-spinners/PulseLoader";

export const Playlist = (props) => {
  const [starred, setStarred] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStarred = async () => {
    setLoading(true);
    try {
      const starredVideoIds = await axios.get(`/api/music/starred`);
      if (starredVideoIds.data.length !== 0) {
        const starredVideoIdsArray = starredVideoIds.data[0].trackId;
        if (starredVideoIdsArray.length !== 0) {
          const starredVideos = await axios.get(
            `/api/music/starredPlaylist/${starredVideoIdsArray}`
          );
          const starredTracks = starredVideos.data[0].body.tracks;
          const starredIds = starredTracks.map((track) => [
            track.id,
            track.name,
            track.artists[0].name,
          ]);
          setStarred(starredVideoIdsArray);
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTrack = async () => {
    console.log("delet this");
  };

  const getVideo = async (song) => {
    const artist = props.artist;
    try {
      const getVideo = await axios.get(`/api/music/video/ ${artist} ${song}`);
      const videoId = getVideo.data.items[0].id.videoId;
      props.video(videoId);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStarred();
  }, [props]);

  return (
    <div className={styles.container}>
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
        <div className={styles.mainTracksList}>
          <ul>
            {starred.length === 0 && <li>No favourites</li>}
            {starred.length > 0 &&
              starred.map((track, index) => (
                <li key={index} onClick={() => getVideo(track)}>
                  {track.length > 30 ? track.substring(0, 35) + "..." : track}
                  <FontAwesomeIcon
                    icon={faStar}
                    onClick={(e) => e.stopPropagation() || deleteTrack()}
                    style={{
                      color: "#ffbf00",
                    }}
                  />
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};
