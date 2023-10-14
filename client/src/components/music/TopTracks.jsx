import { useState } from "react";
import styles from "./TopTracks.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export const TopTracks = (props) => {
  const [starred, setStarred] = useState([]);

  const clickStar = (index) => {
    if (starred.includes(index)) {
      setStarred(starred.filter((item) => item !== index));
    } else {
      setStarred((prevSelectedItems) => [...prevSelectedItems, index]);
    }
    console.log(starred);
  };
  return (
    <div className={styles.container}>
      <div className={styles.topTracks}>
        <h2 className={styles.topTracksTitle}>Top Tracks</h2>
        {props.topTracks && (
          <div className={styles.topTracksList}>
            <ul>
              {props.topTracks.map((track, index) => (
                <li key={index}>
                  {track.length > 30 ? track.substring(0, 30) + "..." : track}
                  <FontAwesomeIcon
                    icon={faStar}
                    className={styles.faStar}
                    onClick={() => clickStar(index)}
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
