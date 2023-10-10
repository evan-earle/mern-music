import blankVideo from "../../assets/blankVideo.jpg";
import styles from "./Youtube.module.css";

export const Youtube = () => {
  return (
    <div className={styles.container}>
      <img
        className={styles.youtubeImage}
        alt="blank video"
        src={blankVideo}
      ></img>
    </div>
  );
};
