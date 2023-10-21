import styles from "./RelatedArtists.module.css";
import { RelatedArtist } from "./RelatedArtist";
import { useState } from "react";

export const RelatedArtists = (props) => {
  const [artist, setArtist] = useState("");
  props.test(artist);

  return (
    <div className={styles.container}>
      <h2 className={styles.relatedAristsTitle}>Related Artists</h2>

      {props.relatedArtists && (
        <div className={styles.relatedList}>
          {props.relatedArtists.map((artist, index) => (
            <RelatedArtist
              key={index}
              name={artist[0]}
              image={artist[1]}
              artistId={artist[2]}
              search={setArtist}
            />
          ))}
        </div>
      )}
    </div>
  );
};
