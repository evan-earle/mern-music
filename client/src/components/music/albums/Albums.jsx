import { Album } from "./Album";
import styles from "./Albums.module.css";

export const Albums = (props) => {
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
            />
          ))}
        </div>
      )}
    </div>
  );
};
