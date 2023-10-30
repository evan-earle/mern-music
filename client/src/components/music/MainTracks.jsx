import { useState, useEffect } from "react";
import styles from "./MainTracks.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Playlist } from "./Playlist";
import axios from "axios";
import "animate.css";

export const MainTracks = (props) => {
  const [starred, setStarred] = useState([]);
  const [active, setActive] = useState(-1);
  const [activePlaylist, setActivePlaylist] = useState(false);

  const getStarred = async () => {
    try {
      const starredVideoIds = await axios.get(`/api/music/starred`);
      if (starredVideoIds.data.length !== 0) {
        const starredVideoIdsArray = starredVideoIds.data[0].trackId;
        setStarred(starredVideoIdsArray);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const clickStar = async (index, track) => {
    try {
      if (starred.includes(track)) {
        await axios.delete(`/api/music/delete/${track}`);
        setStarred(starred.filter((item) => item !== track));
      } else {
        setActive(index);
        await axios.post(`/api/music/add/${track}`);
        setStarred((prevSelectedItems) => [...prevSelectedItems, track]);
        setActive(-1);
      }
    } catch (err) {
      console.log(err);
    }
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

  const passVideoId = (videoId) => {
    props.video(videoId);
  };

  const renderPlaylist = () => {
    setActivePlaylist(!activePlaylist);
  };

  const closePlaylist = () => {
    setActivePlaylist(false);
  };

  const getTopTracks = () => {
    props.top();
  };

  useEffect(() => {
    getStarred();
  }, [props]);

  useEffect(() => {
    closePlaylist();
  }, [props.mainTracks]);

  return (
    <div className={styles.container}>
      <h2 className={styles.mainTracksTitle}>
        {activePlaylist
          ? "Favourites"
          : props.albumTitle
          ? props.albumTitle
          : "Click on an album"}
        <FontAwesomeIcon
          icon={faStar}
          className={activePlaylist ? `animate__animated animate__fadeIn` : ``}
          onClick={() => renderPlaylist()}
          style={{
            color: activePlaylist ? "#ffbf00" : "white",
          }}
        />
      </h2>

      {activePlaylist && (
        <Playlist
          video={passVideoId}
          getMainTracks={getStarred}
          getTopTracks={getTopTracks}
          track={props.track}
          song={props.song}
        />
      )}

      {props.mainTracks && !activePlaylist && (
        <div className={styles.mainTracksList}>
          <ul>
            {props.mainTracks.map((track, index) => (
              <li key={index} onClick={() => getVideo(track[0])}>
                {track[0].length > 45
                  ? track[0].substring(0, 45) + "..."
                  : track[0]}
                <FontAwesomeIcon
                  icon={faStar}
                  className={
                    active !== index ? `animate__animated animate__fadeIn` : ``
                  }
                  onClick={(e) =>
                    e.stopPropagation() || clickStar(index, track[1])
                  }
                  style={{
                    color: starred.includes(track[1]) ? "#ffbf00" : "white",
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
