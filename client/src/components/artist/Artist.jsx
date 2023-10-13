import styles from "./Artist.module.css";

export const Artist = (props) => {
  return (
    <div className={styles.container}>
      <img
        className={styles.artistPhoto}
        src={props.artistPhoto}
        alt={props.artist}
      />
      <div className={styles.artistTags}>
        <h2 className={styles.artist}>{props.artist}</h2>
        <p className={styles.tags}>{props.tags}</p>
      </div>
    </div>
  );
};
