import styles from "./Album.module.css";

export const Album = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.albumImage}>
        <img className={styles.albumImage} src={props.image} alt="" />
      </div>
      <div className={styles.albumDetails}>
        <div>
          <h3 className={styles.albumTitle}>
            {props.name.length > 25
              ? props.name.substring(0, 25) + "..."
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
