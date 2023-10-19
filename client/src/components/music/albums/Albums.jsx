import { Album } from "./Album";
import { useState } from "react";
import styles from "./Albums.module.css";

export const Albums = (props) => {
  const [mainTracks, setMainTracks] = useState("");
  const [albumTitle, setAlbumTitle] = useState("");

  props.mainTracks(mainTracks);
  props.albumTitle(albumTitle);
  return (
    <div className={styles.container}>
      <h2 className={styles.albumsTitle}>Albums</h2>
      {props.albums && (
        <div className={styles.albumsList}>
          {props.albums.map((album, index) => (
            <Album
              key={index}
              type={album[0]}
              name={album[1]}
              year={album[2]}
              image={album[3]}
              albumId={album[4]}
              mainTracks={setMainTracks}
              albumTitle={setAlbumTitle}
            />
          ))}
        </div>
      )}
    </div>
  );
};
