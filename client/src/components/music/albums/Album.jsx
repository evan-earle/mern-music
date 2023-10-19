import styles from "./Album.module.css";
import axios from "axios";

export const Album = (props) => {
  const getAlbum = async (albumId) => {
    const data = await axios.get(`/api/music/album/${albumId}`);
    console.log(data);

    const trackData = data.data[0].body.items;
    const tracklist = trackData.map((track) => [track.name, track.id]);
    props.mainTracks(tracklist);
    props.albumTitle(props.name);
  };

  return (
    <div className={styles.container} onClick={() => getAlbum(props.albumId)}>
      <div className={styles.albumImage}>
        <img className={styles.albumImage} src={props.image} alt="" />
      </div>
      <div className={styles.albumDetails}>
        <div>
          <h3 className={styles.albumTitle}>
            {props.name.length > 20
              ? props.name.substring(0, 20) + "..."
              : props.name}
          </h3>
        </div>
        <div className={styles.yearType}>
          <p>
            {props.year} · {props.type}
          </p>
        </div>
      </div>
    </div>
  );
};
