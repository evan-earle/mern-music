import styles from "./Artist.module.css";

export const Artist = (props) => {
  return (
    <div className={styles.container}>
      <h2>{props.artist}</h2>
      <img src={props.artistPhoto} alt="" />
      <p>{props.description}</p>
      <p className={styles.tags}>{props.tags}</p>
    </div>
  );
};
