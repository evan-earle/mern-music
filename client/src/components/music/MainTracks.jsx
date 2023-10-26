import { useState, useEffect } from "react";
import styles from "./MainTracks.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "animate.css";

export const MainTracks = (props) => {
  const [starred, setStarred] = useState([]);
  const [active, setActive] = useState(-1);
  const [activePlaylist, setActivePlaylist] = useState(false);
  // const [playlist, setPlaylist] = useState("");

  const getStarred = async () => {
    try {
      const starredVideos = await axios.get(`/api/music/starred`);
      starredVideos.data.length === 0
        ? null
        : setStarred(starredVideos.data[0].trackId);
    } catch (err) {
      console.log(err);
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

  const clickStar = async (index, track) => {
    if (starred.includes(track)) {
      await axios.delete(`/api/music/delete/${track}`);
      setStarred(starred.filter((item) => item !== track));
    } else {
      setActive(index);
      await axios.post(`/api/music/add/${track}`);
      setStarred((prevSelectedItems) => [...prevSelectedItems, track]);
      setActive(-1);
    }
  };

  const renderPlaylist = () => {
    setActivePlaylist(!activePlaylist);
  };

  const closePlaylist = () => {
    setActivePlaylist(false);
  };

  const deleteTrack = () => {
    console.log("delete this");
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
          ? "Starred Playlist"
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
        <div className={styles.mainTracksList}>
          <ul>
            {starred.map((track, index) => (
              <li key={index} onClick={() => getVideo(track)}>
                {track.length > 30 ? track.substring(0, 35) + "..." : track}

                <FontAwesomeIcon
                  icon={faStar}
                  className={
                    !activePlaylist ? ` animate__animated animate__fadeIn` : ` `
                  }
                  onClick={(e) => e.stopPropagation() || deleteTrack()}
                  style={{
                    color: starred.includes(track) ? "#ffbf00" : "white",
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      {props.mainTracks && !activePlaylist && (
        <div className={styles.mainTracksList}>
          <ul>
            {props.mainTracks.map((track, index) => (
              <li key={index} onClick={() => getVideo(track[0])}>
                {track[0].length > 30
                  ? track[0].substring(0, 35) + "..."
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
  );
};

//       {props.playlist && activePlaylist && (
//         <div className={styles.mainTracksList}>
//           <ul>
//             {props.playlist.map((track, index) => (
//               <li key={index} onClick={() => getVideo(track)}>
//                 {track.length > 30 ? track.substring(0, 35) + "..." : track}

//                 <FontAwesomeIcon
//                   icon={faStar}
//                   className={
//                     !activePlaylist ? ` animate__animated animate__fadeIn` : ` `
//                   }
//                   onClick={() => deleteTrack()}
//                   style={{
//                     color: starred.includes(track[1]) ? "#ffbf00" : "white",
//                   }}
//                 />
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//       {props.mainTracks && !activePlaylist && (
//         <div className={styles.mainTracksList}>
//           <ul>
//             {props.mainTracks.map((track, index) => (
//               <li key={index} onClick={() => getVideo(track[0])}>
//                 {track[0].length > 30
//                   ? track[0].substring(0, 35) + "..."
//                   : track[0]}

//                 <FontAwesomeIcon
//                   icon={faStar}
//                   className={
//                     active !== index
//                       ? ` animate__animated animate__fadeIn`
//                       : ` `
//                   }
//                   onClick={(e) =>
//                     e.stopPropagation() || clickStar(index, track[1])
//                   }
//                   style={{
//                     color: starred.includes(track[1]) ? "#ffbf00" : "white",
//                   }}
//                 />
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };
