import styles from "./RelatedArtist.module.css";

export const RelatedArtist = (props) => {
  const getArtist = async (artist) => {
    props.search(artist);
  };

  return (
    <div className={styles.container} onClick={() => getArtist(props.name)}>
      <div className={styles.artistImage}>
        <img className={styles.artistImage} src={props.image} alt="" />
      </div>
      <div className={styles.artistDetails}>
        <h3 className={styles.artistTitle}>
          {props.name.length > 20
            ? props.name.substring(0, 20) + "..."
            : props.name}
        </h3>
      </div>
    </div>
  );
};
