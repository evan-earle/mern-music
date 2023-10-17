import { useState, useEffect } from "react";
import styles from "./TopTracks.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "animate.css";

export const TopTracks = (props) => {
  const [starred, setStarred] = useState([]);
  const [active, setActive] = useState(-1);

  const getStarred = async () => {
    try {
      const starredVideos = await axios.get(`/api/music/starred`);
      setStarred(starredVideos.data[0].trackId);
    } catch (err) {
      console.log(err);
    }
  };

  const clickStar = async (index, track) => {
    console.log(index);
    if (starred.includes(track)) {
      setActive(index);
      await axios.delete(`/api/music/delete/${track}`);
      setStarred(starred.filter((item) => item !== track));
      setActive(-1);
    } else {
      setActive(index);
      await axios.post(`/api/music/add/${track}`);
      setStarred((prevSelectedItems) => [...prevSelectedItems, track]);
      setActive(-1);
    }
  };

  const getVideo = async (song) => {
    const artist = props.artist;
    try {
      const getVideo = await axios.get(`/api/music/video/${artist} ${song}`);
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
      <div className={styles.topTracks}>
        <h2 className={styles.topTracksTitle}>Top Tracks</h2>
        {props.topTracks && (
          <div className={styles.topTracksList}>
            <ul>
              {props.topTracks.map((track, index) => (
                <li key={index} onClick={() => getVideo(track[0])}>
                  {track[0].length > 30
                    ? track[0].substring(0, 30) + "..."
                    : track[0]}

                  <FontAwesomeIcon
                    icon={faStar}
                    className={
                      active !== index
                        ? `${styles.faStar} animate__animated animate__fadeIn`
                        : `${styles.faStar} `
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
    </div>
  );
};
