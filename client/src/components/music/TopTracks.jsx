import { useState } from "react";
import styles from "./TopTracks.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export const TopTracks = (props) => {
  const [starred, setStarred] = useState([]);

  const clickStar = async (index, track) => {
    const starredVideos = await axios.post(`/api/music/add/${track}`);
    console.log(starredVideos);

    // const deleteVideos = await axios.post(`/api/music/add/${track}`);
    // console.log(deleteVideos);
    // if (starred.includes(index)) {
    //   setStarred(starred.filter((item) => item !== index));
    // } else {
    //   setStarred((prevSelectedItems) => [...prevSelectedItems, index]);
    // }
    // console.log(starred);
  };

  const getVideo = async (song) => {
    const artist = props.artist;
    try {
      const getVideo = await axios.get(`/api/music/video/${artist} ${song}`);
      console.log(getVideo);
      const videoId = getVideo.data.items[0].id.videoId;
      props.video(videoId);
    } catch (err) {
      console.log(err);
    }
  };

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
                    className={styles.faStar}
                    onClick={(e) =>
                      e.stopPropagation() || clickStar(index, track[1])
                    }
                    style={{
                      color: starred.includes(index) ? "#ffbf00" : "white",
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
