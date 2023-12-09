import styles from "./Youtube.module.css";
import blankVideo from "../../assets/blankVideo.jpg";

export const Youtube = (props) => {
  return (
    <div className={styles.container}>
      {!props.search ? (
        <img
          className={styles.youtubeImage}
          alt="blank video"
          src={blankVideo}
        ></img>
      ) : (
        <iframe
          title={props.search}
          width="100%"
          src={`https://www.youtube.com/embed/${props.search}?autoplay=1`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};
