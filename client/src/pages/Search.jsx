import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import drizzleNight from "../assets/backgrounds/drizzleNight.jpg";
import styles from "./Search.module.css";

export const Search = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/lastSearch/${search}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles["Auth-form-container"]}>
      <form
        className={`${styles["Auth-form"]} animate__animated animate__fadeInRight`}
        onSubmit={onSubmit}
      >
        <div className={styles["Auth-form-content"]}>
          <h3 className={styles["Auth-form-title"]}>Search for an artist</h3>

          <div className="form-group mt-3">
            <label htmlFor="username">Artist</label>
            <input
              className="form-control mt-1"
              required
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter artist"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              className={`btn btn-primary ${styles.search}`}
              type="submit"
            >
              Search
            </button>
          </div>
        </div>
      </form>
      <img
        src={drizzleNight}
        alt="sunny"
        className="animate__animated  animate__fadeInLeft"
      />
    </div>
  );
};
